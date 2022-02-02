import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as fs from 'fs';
import { RentConfig } from '@app/rent/infrastructure/rent-config.interface';

export type ConfigResponse = RentConfig;
const YAML_CONFIG_DIR = '/assets/configs';
export default () => {
    const files = getFiles(join(__dirname, YAML_CONFIG_DIR), []);
    return (files.map(file => yaml.load(readFileSync(file, 'utf8'))) as ConfigResponse[])
        .reduce((pre, curr) => Object.assign(pre, curr), {});
};

function getFiles(dir, files_) {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for (const i in files) {
        const name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}
