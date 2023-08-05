js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		RollAndKeep: function () {
			const hasSpiritLeft = Equip.hasRunewordEquippedAt(me, sdk.body.LeftArm, "Spirit");
			const hasSpiritRight = Equip.hasRunewordEquippedAt(me, sdk.body.RightArm, "Spirit");
			const hasSpirit = hasSpiritLeft || hasSpiritRight;

			// Any Spirit is better than no Spirit
			if (!hasSpirit) {
				Config.Recipes.push([Recipe.Socket.Weapon, "monarch", Roll.NonEth]);
				Config.KeepRunewords.push("[type] == shield && [class] == normal && [flag] == runeword # [itemallskills] == 2 && [fcr] >= 25");
				return true;
			}

			let leftFCR = null;
			if (hasSpiritLeft) {
				const leftEquip = Equip.equippedAt(me, sdk.body.LeftArm);
				if (leftEquip.itemtype === sdk.items.type.Shield) {
					leftFCR = leftEquip.getStatEx(sdk.stats.FCR);
				}

			}
			let rightFCR = null;
			if (hasSpiritRight) {
				const rightEquip = Equip.equippedAt(me, sdk.body.RightArm);
				if (rightEquip.itemtype === sdk.items.type.Shield) {
					rightFCR = rightEquip.getStatEx(sdk.stats.FCR);
				}
			}

			let minFCR = 25;
			switch (true) {
				// Shield in right hand
				case leftFCR === null && rightFCR !== null && rightFCR < 35:
					minFCR = rightFCR;
					break;

				// Shield in left hand
				case rightFCR === null && leftFCR !== null && leftFCR < 35:
					minFCR = leftFCR;
					break;

				// Shield in both hands (probably should never happen)
				case leftFCR !== null && leftFCR < 35 && rightFCR !== null && rightFCR < 35:
					minFCR = leftFCR > rightFCR ? rightFCR : leftFCR;
					break;

				// Both shields max fcr (probably should never happen)
				case leftFCR === 35 && rightFCR === 35:
					return false;

				// No shield at all, just a sword
				case leftFCR === null && rightFCR === null:
				default:
			}

			Config.Recipes.push([Recipe.Socket.Weapon, "monarch", Roll.NonEth]);
			Config.KeepRunewords.push("[type] == shield && [class] == normal && [flag] == runeword # [itemallskills] == 2 && [fcr] > " + minFCR);
			return true;
		}
	}
})(module);
