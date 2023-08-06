js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		MissingOrShouldUpgrade: function () {
			const hasSpiritLeft = Equip.hasRunewordEquippedAt(me, sdk.body.LeftArm, "Spirit");
			const hasSpiritRight = Equip.hasRunewordEquippedAt(me, sdk.body.RightArm, "Spirit");
			const hasSpirit = hasSpiritLeft || hasSpiritRight;
			if (!hasSpirit) {
				return true;
			}
			if (hasSpiritLeft) {
				const leftEquip = Equip.equippedAt(me, sdk.body.LeftArm);
				if (leftEquip !== null && leftEquip.itemType === sdk.items.type.Sword) {
					if (leftEquip.getStatEx(sdk.stats.FCR) < 35) {
						return true;
					}
				}

			}
			if (hasSpiritRight) {
				const rightEquip = Equip.equippedAt(me, sdk.body.RightArm);
				if (rightEquip !== null && rightEquip.itemType === sdk.items.type.Sword) {
					if (rightEquip.getStatEx(sdk.stats.FCR) < 35) {
						return true;
					}
				}
			}
			return false;
		},
		RollAndKeep: function () {
			const hasSpiritLeft = Equip.hasRunewordEquippedAt(me, sdk.body.LeftArm, "Spirit");
			const hasSpiritRight = Equip.hasRunewordEquippedAt(me, sdk.body.RightArm, "Spirit");
			const hasSpirit = hasSpiritLeft || hasSpiritRight;

			// Any Spirit is better than no Spirit
			if (!hasSpirit) {
				Config.Recipes.push([Recipe.Socket.Weapon, "broadsword", Roll.NonEth]);
				Config.Recipes.push([Recipe.Socket.Weapon, "crystalsword", Roll.NonEth]);
				Config.KeepRunewords.push("[type] == sword && [class] == normal && [flag] == runeword # [itemallskills] == 2 && [fcr] >= 25");
				return true;
			}

			let leftFCR = null;
			if (hasSpiritLeft) {
				const leftEquip = Equip.equippedAt(me, sdk.body.LeftArm);
				if (leftEquip !== null && leftEquip.itemType === sdk.items.type.Sword) {
					leftFCR = leftEquip.getStatEx(sdk.stats.FCR);
				}

			}
			let rightFCR = null;
			if (hasSpiritRight) {
				const rightEquip = Equip.equippedAt(me, sdk.body.RightArm);
				if (rightEquip !== null && rightEquip.itemType === sdk.items.type.Sword) {
					rightFCR = rightEquip.getStatEx(sdk.stats.FCR);
				}
			}

			let minFCR = 25;
			switch (true) {
				// Sword in right hand
				case leftFCR === null && rightFCR !== null && rightFCR < 35:
					minFCR = rightFCR;
					break;

				// Sword in left hand
				case rightFCR === null && leftFCR !== null && leftFCR < 35:
					minFCR = leftFCR;
					break;

				// Sword in both hands
				case leftFCR !== null && leftFCR < 35 && rightFCR !== null && rightFCR < 35:
					minFCR = leftFCR > rightFCR ? rightFCR : leftFCR;
					break;

				// Both swords max FCR
				case leftFCR === 35 && rightFCR === 35:
					return false;

				// No sword at all, just a shield
				case leftFCR === null && rightFCR === null:
				default:
			}

			Config.Recipes.push([Recipe.Socket.Weapon, "broadsword", Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, "crystalsword", Roll.NonEth]);
			Config.KeepRunewords.push("[type] == sword && [class] == normal && [flag] == runeword # [itemallskills] == 2 && [fcr] > " + minFCR);
			return true;
		}
	};
})(module);
