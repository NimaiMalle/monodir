const fs = require("fs");
const path = require("path");

function getWorkspaces(rootDir) {
  const rootPackageJson = JSON.parse(
    fs.readFileSync(path.join(rootDir, "package.json"), "utf8")
  );
  return rootPackageJson.workspaces || [];
}

function findPackageJsonFiles(rootDir, workspaces) {
  let results = [];
  workspaces.forEach((workspace) => {
    if (workspace.endsWith("/*")) {
      const dir = path.join(rootDir, workspace.slice(0, -2));
      fs.readdirSync(dir).forEach((subdir) => {
        const packageJsonPath = path.join(dir, subdir, "package.json");
        if (fs.existsSync(packageJsonPath)) {
          results.push(packageJsonPath);
        }
      });
    } else {
      const packageJsonPath = path.join(rootDir, workspace, "package.json");
      if (fs.existsSync(packageJsonPath)) {
        results.push(packageJsonPath);
      }
    }
  });
  return results;
}

function isPinnedVersion(version) {
  return (
    !version.startsWith("^") &&
    !version.startsWith("~") &&
    !version === "*"
  );
}

function checkDependencies(packageJsonFiles) {
  const dependencies = {};
  packageJsonFiles.forEach((file) => {
    const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    Object.entries(deps).forEach(([dep, version]) => {
      if (isPinnedVersion(version)) {
        if (!dependencies[dep]) {
          dependencies[dep] = {};
        }
        dependencies[dep][version] = [
          ...(dependencies[dep][version] || []),
          file,
        ];
      }
    });
  });

  let inconsistenciesFound = false;
  Object.entries(dependencies).forEach(([dep, versions]) => {
    if (Object.keys(versions).length > 1) {
      console.log(`Multiple pinned versions found for ${dep}:`);
      Object.entries(versions).forEach(([version, files]) => {
        console.log(`  ${version}:`);
        files.forEach((file) => console.log(`    ${file}`));
      });
      console.log();
      inconsistenciesFound = true;
    }
  });

  if (!inconsistenciesFound) {
    console.log(
      "No version inconsistencies found in pinned dependencies across workspace packages."
    );
    process.exit(0); // Exit with code 0 if no inconsistencies found
  } else {
    process.exit(1); // Exit with code 1 if inconsistencies found
  }
}

const rootDir = process.cwd();
const workspaces = getWorkspaces(rootDir);
const packageJsonFiles = findPackageJsonFiles(rootDir, workspaces);
checkDependencies(packageJsonFiles);
