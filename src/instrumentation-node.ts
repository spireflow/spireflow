import fs from "fs";
import os from "os";
import path from "path";

const LOCK_FILE = path.join(os.tmpdir(), "spireflow-banner.lock");

export const acquireBannerLock = (): boolean => {
  const currentPpid = String(process.ppid);

  try {
    const existingPpid = fs.readFileSync(LOCK_FILE, "utf-8");
    if (existingPpid === currentPpid) {
      return false;
    }
    fs.unlinkSync(LOCK_FILE);
  } catch {
    // File doesn't exist or can't read - proceed
  }

  try {
    fs.writeFileSync(LOCK_FILE, currentPpid, { flag: "wx" });
    return true;
  } catch {
    return false;
  }
};
