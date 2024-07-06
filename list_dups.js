const { execSync } = require("child_process");
const fs = require("fs");

// If an argument is provided, use it as the root directory
if (process.argv.length > 2) {
  // Check if the provided directory exists
  if (!fs.existsSync(process.argv[2])) {
    console.error(`Error: Directory not found: ${process.argv[2]}`);
    process.exit(1);
  }
  process.chdir(process.argv[2]);
}

function checkDependencies() {
  try {
    // Run yarn list and get the output
    const yarnListOutput = execSync("yarn list", { encoding: "utf8" });

    // Process the output
    const dependencies = yarnListOutput
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.match(/[│├└][\s─]*.+@.+/))
      .map((line) => {
        const match = line.match(/[│├└][\s─]*(.+)@(.+)/);
        return match ? `${match[1]}@${match[2]}` : null;
      })
      .filter((dep) => dep && !dep.startsWith("@") && !dep.includes(":"))
      .sort();

    // Find duplicates
    const duplicates = dependencies.reduce((acc, dep) => {
      const [name, version] = dep.split("@");
      if (!acc[name]) {
        acc[name] = new Set();
      }
      acc[name].add(version);
      return acc;
    }, {});

    const conflicts = Object.entries(duplicates)
      .filter(([, versions]) => versions.size > 1)
      .map(
        ([name, versions]) =>
          `${name.replace(/^[│├└─ ]+/, "")}:\n${Array.from(versions)
            .map((v) => `  ${v}`)
            .join("\n")}`
      );

    // Output results
    if (conflicts.length > 0) {
      console.error("Multiple versions of the same dependency found:");
      console.error(conflicts.join("\n\n"));
      process.exit(1);
    } else {
      console.log("Dependency check passed. No conflicts found.");
      process.exit(0);
    }
  } catch (error) {
    console.error("Error running dependency check:", error);
    process.exit(1);
  }
}

checkDependencies();
