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
			sdk.body.LeftArm,
			sdk.body.RightArm
		],
		Name: 'Ancients Pledge',
		missing: function () {
			let i, loc;
			for (i = 0; i < this.BodyLocs.length; i++) {
				loc = this.BodyLocs[i];
				if (!Equip.hasRunewordEquippedAt(me, loc, 'Ancients Pledge')) {
					continue;
				}
				return true;
			}
			return false;
		},
		shouldUpgrade: function () {
			return this.missing();
		},
		missingOrShouldUpgrade: function () {
			return this.missing() || this.shouldUpgrade();
		},
		rollAndKeep: function () {
			Config.Recipes.push([Recipe.Socket.Weapon, 'kiteshield', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'largeshield', Roll.NonEth]);
			Config.Runewords.push([Runeword.AncientsPledge, 'kiteshield', Roll.NonEth]);
			Config.Runewords.push([Runeword.AncientsPledge, 'largeshield', Roll.NonEth]);
			Config.KeepRunewords.push('[type] == shield && [class] == normal && [flag] == runeword # [coldresist] == 43 && [fireresist] == 48 && [lightresist] == 48');
		}
	}
})(module);
