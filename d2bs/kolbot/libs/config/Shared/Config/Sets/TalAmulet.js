js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		BodyLocs: [
			sdk.body.Neck
		],
		Name: 'Tal Rasha\'s Adjudication',
		farmScripts: function () {
			return [
				'Mephisto',
				'Andariel'
			];
		},
		missing: function () {
			let i, loc;
			for (i = 0; i < this.BodyLocs.length; i++) {
				loc = this.BodyLocs[i];
				if (!Equip.hasSetEquippedAt(me, loc, this.Name)) {
					continue;
				}
				return true;
			}
			return false;
		},
		shouldUpgrade: function () {
			if (this.missing()) {
				return true;
			}
			return false;
		},
		missingOrShouldUpgrade: function () {
			return this.missing() || this.shouldUpgrade();
		},
		rollAndKeep: function () {
			if (!this.missingOrShouldUpgrade()) {
				return false;
			}
			Config.KeepRunewords.push(
				"[name] == amulet && [quality] == set # [sorceressskills] == 2"
			);
			return true;
		}
	}
})(module);
