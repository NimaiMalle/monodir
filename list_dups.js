const fs = require("fs");
const path = require("path");

function getWorkspaces(rootDir) {
  const packageJsonPath = path.join(rootDir, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`No package.json found in ${rootDir}`);
  }
  const rootPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  if (!rootPackageJson.workspaces) {
    throw new Error(
      `The package.json in ${rootDir} does not define any workspaces`
    );
  }
  return rootPackageJson.workspaces;
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
  // Ignore file dependencies
  if (version.startsWith("file:")) {
    return false;
  }
  return (
    !version.startsWith("^") && !version.startsWith("~") && version !== "*"
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
    process.exit(0);
  } else {
    process.exit(1);
  }
}

// Get the directory from command line argument, or use current directory if not provided
const rootDir = path.resolve(process.argv[2] || process.cwd());

try {
  const workspaces = getWorkspaces(rootDir);
  const packageJsonFiles = findPackageJsonFiles(rootDir, workspaces);
  checkDependencies(packageJsonFiles);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
