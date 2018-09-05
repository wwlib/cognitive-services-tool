import { expect } from 'chai';
import 'mocha';

import AppSettings from '../src/renderer/model/AppSettings';

describe('AppSettings', () => {
    it('nluDefault should not be undefined', () => {
        let appSettings: AppSettings = new AppSettings();
        expect(appSettings.nluDefault).to.not.be.undefined;
    });
});
