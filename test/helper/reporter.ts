import allure from "@wdio/allure-reporter"
import logger from "./logger"

/**
 * Global reporter used for both logger and Allure.
 * Currently added message goes as a arg to .addstep() of alllure, add more param as required
 * Allure can ignore certain steps such as retry steps
 * @param testid : this.testid or NA. This is a mandatory field
 * @param loglevel 
 * @param toAllure default true
 * @param msg 
 * @todo 
 * 1. Add more param of allure reporter like add issue (to add an JIRA issue..etc)
 */
function addStep(testid: string, loglevel: string, msg: string, toAllure = true, issueid = undefined) {
    if (!testid || !msg) throw Error('Invalid testid or msg field to report step');

    const arr = ["info", "debug", "warn", "error"];
    if (!arr.includes(loglevel)) {
        logger.error(`Given loglevel: ${loglevel} is invalid and should be one of these values: ${arr}`);
        return;
    }
    
    let logFunction;
    switch (loglevel) {
      case 'info':
        logFunction = logger.info;
        break;
      case 'debug':
        logFunction = logger.debug;
        break;
      case 'warn':
        logFunction = logger.warn;
        break;
      case 'error':
        logFunction = logger.error;
        allure.addStep(msg, {}, 'failed'); // Substep to fail if error
        break;
      default:
        throw Error('Unknown loglevel');
    }

    try {
        logFunction(`[${testid}]: ${msg}`);
        
        if (toAllure) allure.addStep(msg);
        if (issueid) allure.addIssue(issueid);
    } catch (err) {
        throw Error(`Error reporting reporter step, ${err}`);
    }
}

export default { addStep }
