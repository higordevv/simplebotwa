import fs from "fs-extra";
import path from "path";
import { FgYellow, Reset } from "./Colors";

export default () => {
  const cachePath = path.resolve("cache");
  fs.readdir(cachePath, (err, dirs) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(FgYellow, `[!]check void dir:`, Reset);
    dirs.forEach((dir) => {
      console.log(`\t|_${dir}`);
      fs.stat(`${cachePath}/${dir}`, (errTwo, stat) => {
        if (errTwo) {
          console.log(err);
          return;
        }

        if (!stat.isDirectory()) {
          return;
        }
        fs.readdir(`${cachePath}/${dir}`, (errTre, files) => {
          if (files.length <= 0) {
            console.log(FgYellow, `[!] removing void dir ${dir}`, Reset);
            const pastaAlvo = `${cachePath}/${dir}`;
            fs.removeSync(pastaAlvo);
          }
        });
      });
    });
  });
};
