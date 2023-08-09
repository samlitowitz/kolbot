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
			sdk.body.Head
		],
		Name: 'Tal Rasha\'s Horadric Crest',
		FarmScripts: function() {
			return [
				'Mephisto',
				'Andariel'
			];
		},
		Missing: function () {
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
		ShouldUpgrade: function () {
			if (this.Missing()) {
				return true;
			}
			return false;
		},
		MissingOrShouldUpgrade: function () {
			return this.Missing() || this.ShouldUpgrade();
		},
		RollAndKeep: function () {
			if (!this.MissingOrShouldUpgrade()) {
				return false;
			}
			Config.KeepRunewords.push(
				"[name] == deathmask && [quality] == set"
			);
			return true;
		}
	}
})(module);
