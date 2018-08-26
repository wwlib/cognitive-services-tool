import { expect } from 'chai';
import 'mocha';

import AppInfo from '../src/renderer/model/AppInfo';

describe('AppInfo', () => {
    it('nluDefault should not be undefined', () => {
        let appInfo: AppInfo = new AppInfo();
        expect(appInfo.nluDefault).to.not.be.undefined;
    });
});
