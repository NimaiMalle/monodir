# Monodir Test Project

## Overview

This repository serves as a proof of concept for a "mono-directory" structure in NodeJS. The project explores a monorepo setup with multiple project directories and a top-level "common" directory for truly cross-project shared library packages.

## Goals

1. Demonstrate a monorepo structure using yarn workspaces.
2. Explore dependency management across multiple projects and shared libraries.
3. Test version resolution of popular npm packages (e.g., lodash, moment) across different parts of the monorepo.
4. Investigate challenges and solutions in maintaining consistent dependency versions in a monorepo setup.

## Structure

- `common/`: Top-level directory for cross-project shared library packages.
- `project1/`, `project2/`, etc.: Individual project directories, each functioning as a yarn workspace.
  - `app1/`, `app2/`, etc.: Application packages within each project.
  - `common/`: Project-specific shared library packages.

## Setup
Install dependencies for the global shared library packages, and the separate project workspaces.
```bash
cd common/global-lib1 && yarn install && cd -
cd common/global-lib2 && yarn install && cd -
cd project1 && yarn install && cd -
cd project2 && yarn install && cd -
```

## Runing
Run the applications to see what versions of the packages are used.
```bash
node project1/app1/index.js
node project1/app2/index.js
node project2/app1/index.js
```

## Explore
Take a look at the various `package.json` files in the repository.  Note how the `app` dependencies are static or pinned, and the 

## List Duplicate Dependencies
The root level `list_dups.js` lists any dependencies in any yarn workspace, where there are multiple static versions of the same package declared.  For example, try changing `project2/app2/package.json` to depend on lodash version 4.17.20.  Run:
```bash
node list_dups.js project2
```
This script exists to check if, within a single workspace, there are multiple packages using different pinned or static versions of the same package.  This is a no-no.


## Learnings

- In each workspace directory:
    - Use ranged versions as desired in any workspace-shared packages.
    - Use static pinned versions in any workspace applications.  ("Applications" are never used in dependencies of other packages.)
- Packages in the top-level `common` directory are meant to be available to all project workspaces
    - These "global" packages will always use the exact versions of dependencies as resolved when yarn install was run
    - Even when a ranged version is specified, the resolution of that ranged version is fixed when `yarn install` is run in the package' directory

## License

`:P` This project is released into the public domain. You are free to use, modify, distribute, and perform the work, even for commercial purposes, without asking permission.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.