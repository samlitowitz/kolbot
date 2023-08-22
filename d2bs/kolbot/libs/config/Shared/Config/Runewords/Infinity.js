js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		Name: 'Infinity',
		missing: function () {
			const merc = me.getMerc();
			const hasInfinity = Equip.hasRunewordEquippedAt(merc, sdk.body.LeftArm, 'Infinity');
			return !hasInfinity;
		},
		shouldUpgrade: function () {
			return this.missing();
		},
		missingOrShouldUpgrade: function () {
			return this.missing() || this.shouldUpgrade();
		},
		rollAndKeep: function () {
			Config.Recipes.push([Recipe.Socket.Weapon, 'giantthresher', Roll.Eth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'thresher', Roll.Eth]);
			Config.Runewords.push([Runeword.Infinity, 'giantthresher', Roll.Eth]);
			Config.Runewords.push([Runeword.Infinity, 'thresher', Roll.Eth]);
			Config.KeepRunewords.push('[type] == polearm && [class] == elite && [flag] == runeword && [flag] == ethereal # [convictionaura] == 12');
		}
	};
})(module);
