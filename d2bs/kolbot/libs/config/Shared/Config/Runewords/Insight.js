js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		Missing: function() {
			const merc = me.getMerc();
			const hasInsight = Equip.hasRunewordEquippedAt(merc, sdk.body.LeftArm, 'Insight');
			return !hasInsight;
		},
		ShouldUpgrade: function () {
			if (this.Missing()) {
				return true;
			}
			const merc = me.getMerc();
			const mercWeapon = Equip.equippedAt(merc, sdk.body.LeftArm);
			const hasEliteInsight = mercWeapon.itemclass === sdk.class.Elite,
				hasEtherealInsight = mercWeapon.getFlag(sdk.items.flags.Ethereal)
			;

			return !hasEliteInsight || !hasEtherealInsight;
		},
		MissingOrShouldUpgrade: function() {
			return this.Missing() || this.ShouldUpgrade();
		},
		RollAndKeep: function () {
			const missing = this.Missing(),
				upgrade = this.ShouldUpgrade()
			;
			if (!missing && !upgrade) {
				return false;
			}
			if (missing) {
				Config.Recipes.push([Recipe.Socket.Weapon, 'polearm', Roll.All]);
				Config.KeepRunewords.push('[type] == polearm && [flag] == runeword # [meditationaura] >= 12');
				return true;
			}

			Config.Recipes.push([Recipe.Socket.Weapon, 'giantthresher', Roll.All]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'greatpoleaxe', Roll.All]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'thresher', Roll.All]);
			Config.KeepRunewords.push('[type] == polearm && [class] == elite && [flag] == runeword && [flag] == ethereal # [meditationaura] >= 12');
			return true;
		}
	};
})(module);
