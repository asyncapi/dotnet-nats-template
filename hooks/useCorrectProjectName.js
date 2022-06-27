/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require('fs');
const path = require('path');

/**
 * Since we cannot control the name of folders, we need to rename the default one to the desired project name after it's done generating the code.
 */
module.exports = {
  'generate:after': (generator) => {
    const { projectName } = generator.templateParams;
    const defaultProjectName = 'AsyncapiNatsClient';
    if (projectName !== defaultProjectName) {
      const currentPathToProject = path.resolve(generator.targetDir, 'AsyncapiNatsClient');
      const newPathToProject = path.resolve(generator.targetDir, projectName);
      fs.renameSync(currentPathToProject, newPathToProject);
      const currentPathToTestProject = path.resolve(generator.targetDir, 'AsyncapiNatsClientTests');
      const newPathToTestProject = path.resolve(generator.targetDir, `${projectName}Tests`);
      fs.renameSync(currentPathToTestProject, newPathToTestProject);
    }
  }
};
