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

## Key Features

- Use of yarn workspaces for managing multiple packages.
- Implementation of "Hello World" style applications and trivial shared libraries.
- Exploration of dependency version resolution, particularly with lodash and moment.
- Investigation of pinned versions vs. range specifications in different parts of the monorepo.

## Learnings

- Challenges in maintaining consistent versions across a monorepo structure.
- Limitations of yarn in dynamically adapting shared library dependencies to application-specific versions.
- Importance of careful version management in monorepo setups.

## Future Work

- Explore advanced dependency management tools and strategies for monorepos.
- Implement and test solutions for ensuring version consistency across the project.
- Investigate build and deployment strategies for monorepo applications.

## Contributing

This project is a personal exploration and learning exercise. However, observations, suggestions, and discussions are welcome through GitHub issues.

## License

This project is released into the public domain. You are free to use, modify, distribute, and perform the work, even for commercial purposes, without asking permission.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.