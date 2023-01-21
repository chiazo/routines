import cliSelect from "cli-select";
import * as rl from "readline-sync";
import chalk from "chalk";

import fb from "../data/services/cli_firebase_config.js";

import { Options } from "../models/Option.js";

/**
 * 1. Log in (enter email + password)
 * 2. menu options
 *    - see existing routines
 *    - add routines
 *    - edit routine
 *    - delete routine
 * 3. see existing routines
 *    - print out list
 *    - print out schedule
 * 4. add routine
 *    - enter pertinent info
 * 5. delete routine
 *    - select which to delete
 */

// LOG IN TO ACCOUNT

let user = null;
const email = rl.question(
  "Welcome to Routines!\n\nTo continue, please login:\n\nEmail: "
);
const password = rl.question("Password: ", {
  hideEchoBack: true,
});

login(email, password);

// HELPER METHODS
function login(email, password) {
  fb.auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("\nSign in successful!");
      user = {
        uid: fb.auth.currentUser.uid,
        displayName:
          fb.auth.currentUser.displayName || email.match(/^([^@]+)/)[0],
      };
      afterLogIn();
    })
    .catch((e) => {
      console.log("\n" + e.message);
      return;
    });
}

function logout() {
  fb.auth.signOut();
}

function afterLogIn() {
  console.log(`Welcome ${user.displayName}. What would you like to do?\n`);

  if (user) {
    cliSelect({
      values: Options.defaults.map((o) => o._description),
      valueRenderer: (value, selected) => {
        if (selected) {
          return chalk.underline(value);
        }
        return value;
      },
    })
      .then // check which option they selected
      ();
  }
}
