js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		MissingOrShouldUpgrade: function() {
			const merc = me.getMerc();
			const hasInfinity = Equip.hasRunewordEquippedAt(merc, sdk.body.LeftArm, "Infinity");
			return !hasInfinity;
		},
		RollAndKeep: function () {
			const merc = me.getMerc();
			const hasInfinity = Equip.hasRunewordEquippedAt(merc, sdk.body.LeftArm, "Infinity");

			if (hasInfinity) {
				return false;
			}

			Config.Recipes.push([Recipe.Socket.Weapon, "giantthresher", Roll.All]);
			Config.Recipes.push([Recipe.Socket.Weapon, "thresher", Roll.All]);
			Config.KeepRunewords.push("[type] == polearm && [class] == elite && [flag] == runeword && [flag] == ethereal # [convictionaura] == 12");
			return true;
		}
	};
})(module);
