js_strict(true);

const noop = function() {};

if (typeof sdk === 'undefined') {
	var sdk = require('../../modules/sdk');
}
if (!isIncluded("common/Cubing.js")) {
	include("common/Cubing.js");
}
if (!isIncluded("common/Prototypes.js")) {
	include("common/Prototypes.js");
}
if (!isIncluded("common/Runewords.js")) {
	include("common/Runewords.js");
}
if (!isIncluded("common/Town.js")) {
	include("common/Town.js");
}

if (typeof Infinity === 'undefined') {
	var Infinity = require('../Shared/Config/Runewords/Infinity');
}
if (typeof Insight === 'undefined') {
	var Insight = require('../Shared/Config/Runewords/Insight');
}
if (typeof SpiritSword === 'undefined') {
	var SpiritSword = require('../Shared/Config/Runewords/SpiritSword');
}
if (typeof SpiritMonarch === 'undefined') {
	var SpiritMonarch = require('../Shared/Config/Runewords/SpiritMonarch');
}

Infinity.RollAndKeep() ? noop() : Insight.RollAndKeep();

SpiritSword.RollAndKeep();
SpiritMonarch.RollAndKeep();

var AutoBuildTemplate = {
	1: {
		Update: function () {
			Config.StashGold = 200;
			Config.LowGold = 10000;
			Config.OpenChests = true;
			Config.LogExperience = true;

			Config.ScanShrines = [
				sdk.shrines.Refilling,
				sdk.shrines.Health,
				sdk.shrines.Mana,
				sdk.shrines.Experience,
				sdk.shrines.ManaRecharge,
				sdk.shrines.Skill,
				sdk.shrines.Stamina,
				sdk.shrines.Combat,
				sdk.shrines.Armor
			];

			Config.AutoEquip = true;


			Scripts.LlamaSorc = true;

			// Auto-smurf config
			require('../Shared/Config/AutoSmurf');
			delete Scripts.AutoSmurf;

			// Cubing
			Config.Cubing = true;
			require('../Shared/Config/Recipes');
			// require('../Shared/Config/LevelingRecipes');

			// Runewords
			Config.MakeRunewords = true; // Set to true to enable runeword making/rerolling
			require('../Shared/Config/Runewords');
			// require('../Shared/Config/LevelingRunewords');

			require('../Shared/Config/PickIt');
			// require('../Shared/Config/LevelingPickIt');

			// Teleport
			Config.NoTele = true;

			// Evasion
			Config.Dodge = true;
			Config.DodgeRange = 3;
			Config.DodgeHP = 75;

			// Static
			Config.CastStatic = 60;
			Config.StaticList = ["Griswold", "Andariel", "Duriel", "Mephisto", "Izual", "Diablo", "Baal"];

			// Pots
			Config.UseHP = 70;
			Config.UseRejuvHP = 40;
			Config.UseMP = 30;
			Config.UseRejuvMP = 1;
			Config.UseMercHP = 75;
			Config.UseMercRejuv = 50;
			Config.HPBuffer = 8;
			Config.MPBuffer = 8;
			Config.RejuvBuffer = 4;

			// Chicken
			Config.LifeChicken = 10;
			Config.ManaChicken = 0;
			Config.MercChicken = 0;
			Config.TownHP = 30;
			Config.TownMP = 0;

			// Combat
			Config.ClearType = 0;

			Config.AttackSkill = [
				sdk.skills.Attack, // Pre-attack
				sdk.skills.FireBolt, // Bosses
				sdk.skills.FireBolt, // Untimed to bosses
				sdk.skills.FireBolt, // Others
				sdk.skills.FireBolt, // Untimed to others
				sdk.skills.Attack, // Immune
				-1 // Untimed to immune
			];
			Config.LowManaSkill = [sdk.skills.Attack, sdk.skills.Attack];

			Config.BeltColumn = ["hp", "hp", "mp", "mp"];
			Config.MinColumn = [1, 0, 0, 0];
		}
	},

	2: {
		SkillPoints: [sdk.skills.ChargedBolt],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Config.AttackSkill = [
				-1, // Pre-attack
				sdk.skills.ChargedBolt, // Bosses
				sdk.skills.ChargedBolt, // Untimed to bosses
				sdk.skills.ChargedBolt, // Others
				sdk.skills.ChargedBolt, // Untimed to others
				sdk.skills.Attack, // Immune
				-1 // Untimed to immune
			];
		}
	},

	3: {
		SkillPoints: [sdk.skills.ChargedBolt],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	4: {
		SkillPoints: [sdk.skills.ChargedBolt],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	5: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	6: {
		SkillPoints: [sdk.skills.FrostNova, sdk.skills.StaticField],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Config.DodgeRange = 5;
			Config.DodgeHP = 75;

			Config.MinColumn = [1, 1, 1, 0];

			Scripts.Countess = true;
		}
	},

	7: {
		SkillPoints: [sdk.skills.ChargedBolt],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	8: {
		SkillPoints: [sdk.skills.ChargedBolt],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	9: {
		SkillPoints: [sdk.skills.ChargedBolt],
		StatPoints: [
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength
		],
		Update: function () {
		}
	},

	10: {
		SkillPoints: [sdk.skills.ChargedBolt],
		StatPoints: [
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength
		],
		Update: function () {
		}
	},

	11: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength
		],
		Update: function () {
		}
	},

	12: {
		SkillPoints: [sdk.skills.Nova, sdk.skills.Nova],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Config.HPBuffer = 8;
			Config.MPBuffer = 12;

			Config.AttackSkill = [
				-1, // Pre-attack
				sdk.skills.ChargedBolt, // Bosses
				sdk.skills.ChargedBolt, // Untimed to bosses
				sdk.skills.Nova, // Others
				sdk.skills.Nova, // Untimed to others
				-1, // Immune
				-1 // Untimed to immune
			];
		}
	},

	13: {
		SkillPoints: [sdk.skills.Nova],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Scripts = {};

			Scripts.AutoSmurf = true;
		}
	},

	14: {
		SkillPoints: [sdk.skills.Nova],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	15: {
		SkillPoints: [sdk.skills.Nova],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	16: {
		SkillPoints: [sdk.skills.Nova],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	17: {
		SkillPoints: [sdk.skills.Telekinesis],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	18: {
		SkillPoints: [sdk.skills.Teleport],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Config.TownMP = 5;

			// Teleport
			Config.NoTele = false;

			// Evasion
			Config.Dodge = true;
			Config.DodgeHP = 50;
			Config.DodgeRange = 15;

			// Pots
			Config.BeltColumn = ["hp", "mp", "mp", "mp"];
			Config.MinColumn = [1, 1, 1, 1];

			// Combat
			Config.LowManaSkill = [-1, -1];
		}
	},

	19: {
		SkillPoints: [sdk.skills.Nova],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	20: {
		SkillPoints: [sdk.skills.Nova],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Config.StashGold = 10000;
			Config.LowGold = 50000;

			Config.NoTele = true;

			Scripts = {};

			if (me.gold < Config.LowGold) {
				Scripts.ClearAnyArea = true;
				Config.ClearAnyArea.AreaList = [
					// Forgotten Tower
					21, 22, 23, 24, 25
				];
			} else {
				Scripts.Countess = true;
			}
			Scripts.AutoSmurf = true;
			Scripts.TombsSuperChest = true;
		}
	},

	21: {
		SkillPoints: [sdk.skills.IceBolt],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	22: {
		SkillPoints: [sdk.skills.IceBlast],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	23: {
		SkillPoints: [sdk.skills.GlacialSpike],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	24: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Config.UseHP = 80;
			Config.UseMercHP = 90;
			Config.HPBuffer = 12;
			Config.MPBuffer = 12;
			Config.RejuvBuffer = 4;

			Config.AttackSkill = [
				-1, // Pre-attack
				sdk.skills.Blizzard, // Bosses
				sdk.skills.Nova, // Untimed to bosses
				sdk.skills.Blizzard, // Others
				sdk.skills.Nova, // Untimed to others
				-1, // Immune
				-1 // Untimed to immune
			];
		}
	},

	25: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Config.AttackSkill = [
				-1, // Pre-attack
				sdk.skills.Blizzard, // Bosses
				sdk.skills.GlacialSpike, // Untimed to bosses
				sdk.skills.Blizzard, // Others
				sdk.skills.GlacialSpike, // Untimed to others
				sdk.skills.StaticField, // Immune
				sdk.skills.Telekinesis // Untimed to immune
			];

			Config.NoTele = false;

			Scripts = {};

			if (me.gold < Config.LowGold) {
				Config.NoTele = true;

				Scripts.ClearAnyArea = true;
				Config.ClearAnyArea.AreaList = [
					// Forgotten Tower
					21, 22, 23, 24, 25
				];
			} else {
				Scripts.Countess = true;
			}
			Scripts.LKFarm = true;
			Scripts.AutoSmurf = true;
			Scripts.Mephisto = true;
		}
	},

	26: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	27: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Scripts = {};
			Scripts.AutoSmurf = true;

			if (me.gold < Config.LowGold) {
				Config.NoTele = true;

				Scripts.ClearAnyArea = true;
				Config.ClearAnyArea.AreaList = [
					// Forgotten Tower
					21, 22, 23, 24, 25
				];
			} else {
				Scripts.Countess = true;
			}
			Scripts.LKFarm = true;
			Scripts.Cows = true;
			Scripts.Travincal = true;
			Scripts.Diablo = true;
		}
	},

	28: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},
	29: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	30: {
		SkillPoints: [],
		StatPoints: [],
		Update: function () {
			Config.AutoEquip = false;
			// print('RESPEC');
			// die();
			// Config.AutoSkill.Enabled = true;
			// Config.AutoSkill.Build = [
			// 	[sdk.skills.StaticField, 1],
			// 	[sdk.skills.Telekinesis, 1],
			// 	[sdk.skills.Teleport, 1],
			// 	[sdk.skills.FrozenArmor, 1],
			// 	[sdk.skills.IceBolt, 1],
			// 	[sdk.skills.IceBlast, 3],
			// 	[sdk.skills.GlacialSpike, 13],
			// 	[sdk.skills.Blizzard, 7],
			// 	[sdk.skills.ColdMastery, 1]
			// ];

			// Config.AutoStat.Enabled = true;
			// Config.AutoStat.Build = [
			// 	[sdk.stats.Strength, 45],
			// 	[sdk.stats.Energy, 50],
			// 	[sdk.stats.Vitality, "all"]
			// ];

			// Config.AttackSkill = [
			// 	-1, // Pre-attack
			// 	sdk.skills.Blizzard, // Bosses
			// 	sdk.skills.GlacialSpike, // Untimed to bosses
			// 	sdk.skills.Blizzard, // Others
			// 	sdk.skills.GlacialSpike, // Untimed to others
			// 	sdk.skills.StaticField, // Immune
			// 	-1 // Untimed to immune
			// ];
		}
	},

	31: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	32: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	33: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Config.NoTele = false;

			Scripts = {};
			Scripts.AutoSmurf = true;

			if (me.gold < Config.LowGold) {
				Scripts.ClearAnyArea = true;
				Config.ClearAnyArea.AreaList = [
					// Forgotten Tower
					21, 22, 23, 24, 25
				];
			} else {
				Scripts.Countess = true;
			}
			Scripts.LKFarm = true;
			Scripts.Cows = true;
			Scripts.Travincal = true;
			Scripts.Diablo = true;
		}
	},

	34: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	35: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Config.HPBuffer = 6;
			Config.ClearType = 0xf;

			Config.BeltColumn = ["hp", "mp", "mp", "rv"];
			Config.MinColumn = [1, 1, 1, 0];

			Scripts = {};

			Scripts.Cows = true;

			Scripts.LKFarm = true;
			Scripts.Cows = true;
			Scripts.Travincal = true;
			Scripts.Diablo = true;

			Scripts.AutoSmurf = true;
		}
	},

	36: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			// GO TO NIGHTMARE?
			Config.HPBuffer = 6;
			Config.ClearType = 0xf;

			Config.BeltColumn = ["hp", "mp", "mp", "rv"];
			Config.MinColumn = [1, 1, 1, 0];

			Config.SkipImmune = ["Cold"];
			Config.MercWatch = false;

			Scripts = {};

			if (me.gold < Config.LowGold) {
				Scripts.ClearAnyArea = true;
				Config.ClearAnyArea.AreaList = [
					// Forgotten Tower
					21, 22, 23, 24, 25
				];
			}

			Scripts.AutoSmurf = true;
		}
	},

	37: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Scripts = {};

			Scripts.Cows = true;
			Scripts.Travincal = true;
		}
	},

	38: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Scripts = {};

			Scripts.ClearAnyArea = true;
			Config.ClearAnyArea.AreaList = [
				// Forgotten Tower
				21, 22, 23, 24, 25,
				// Pit
				12, 16
			];
		}
	},

	39: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	40: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	41: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	42: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	43: {
		SkillPoints: [sdk.skills.Blizzard],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	44: {
		SkillPoints: [sdk.skills.ColdMastery],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	45: {
		SkillPoints: [sdk.skills.ColdMastery],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	46: {
		SkillPoints: [sdk.skills.ColdMastery],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	47: {
		SkillPoints: [sdk.skills.ColdMastery],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	48: {
		SkillPoints: [sdk.skills.ColdMastery],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	49: {
		SkillPoints: [sdk.skills.ColdMastery],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	50: {
		SkillPoints: [sdk.skills.ColdMastery],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			// Config.MercWatch = false
			// Config.LifeChicken = 0;
			// Config.ManaChicken = 0;
			// Config.MercChicken = 0;
			// Config.TownHP = 0;
			// Config.TownMP = 0;

			Scripts = {};

			Scripts.ClearAnyArea = true;
			Config.ClearAnyArea.AreaList = [
				// Forgotten Tower
				21, 22, 23, 24, 25,
				// Pit
				12, 16
			];

			Scripts.AutoSmurf = true;
		}
	},

	51: {
		SkillPoints: [sdk.skills.ColdMastery],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	52: {
		SkillPoints: [sdk.skills.ColdMastery],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Scripts = {};

			Scripts.ClearAnyArea = true;
			Config.ClearAnyArea.AreaList = [
				// Forgotten Tower
				21, 22, 23, 24, 25,
				// Pit
				12, 16
			];

			Scripts.AncientTunnels = true;
			Config.AncientTunnels.OpenChest = true;
			Config.AncientTunnels.ClearType = 0xf;
		}
	},

	53: {
		SkillPoints: [sdk.skills.ColdMastery],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	54: {
		SkillPoints: [sdk.skills.ColdMastery],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	55: {
		SkillPoints: [sdk.skills.ColdMastery],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	56: {
		SkillPoints: [sdk.skills.ColdMastery],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	57: {
		SkillPoints: [sdk.skills.ColdMastery],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	58: {
		SkillPoints: [sdk.skills.GlacialSpike],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Config.HPBuffer = 2;
			Config.MPBuffer = 6;
			Config.RejuvBuffer = 4;

			Config.BeltColumn = ["mp", "mp", "mp", "hp"];
			Config.MinColumn = [1, 1, 1, 1];

			Scripts = {};

			Scripts.LKFarm = true;
			Scripts.ChestMania = true;
			Config.ChestMania = {
				Act1: [19, 21, 22, 23, 24, 25],
			};

			Scripts.Countess = true;

			// Scripts.AncientTunnels = true;
			// Config.AncientTunnels.OpenChest = true;
			// Config.AncientTunnels.ClearType = 0xf;

			Scripts.Mephisto = true;
			Scripts.Andariel = true;

			Scripts.Cows = true;

			Scripts.Diablo = true;

			Scripts.AutoSmurf = true;
		}
	},

	59: {
		SkillPoints: [sdk.skills.GlacialSpike],
		StatPoints: [
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength
		],
		Update: function () {
		}
	},

	60: {
		SkillPoints: [sdk.skills.GlacialSpike],
		StatPoints: [
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength
		],
		Update: function () {
			Config.StashGold = 50000;
			Config.LowGold = 100000;

			// Config.HPBuffer = 4;

			// Config.BeltColumn = ["mp", "mp", "hp", "rv"];
			// Config.MinColumn = [1, 1, 1, 0];
		}
	},

	61: {
		SkillPoints: [sdk.skills.GlacialSpike],
		StatPoints: [
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Strength
		],
		Update: function () {
		}
	},

	62: {
		SkillPoints: [sdk.skills.GlacialSpike],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	63: {
		SkillPoints: [sdk.skills.GlacialSpike],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	64: {
		SkillPoints: [sdk.skills.IceBlast],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	65: {
		SkillPoints: [sdk.skills.IceBlast],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	66: {
		SkillPoints: [sdk.skills.IceBlast],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	67: {
		SkillPoints: [sdk.skills.IceBlast],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	68: {
		SkillPoints: [sdk.skills.IceBlast],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	69: {
		SkillPoints: [sdk.skills.IceBlast],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	70: {
		SkillPoints: [sdk.skills.IceBlast],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Config.UseHP = 70;
			Config.UseRejuvHP = 40;
			Config.UseMP = 30;
			Config.UseRejuvMP = 10;
			Config.UseMercHP = 85;
			Config.UseMercRejuv = 50;
			Config.HPBuffer = 6;
			Config.MPBuffer = 2;
			Config.RejuvBuffer = 4;

			// Chicken
			Config.LifeChicken = 10;
			Config.ManaChicken = 0;
			Config.MercChicken = 0;
			Config.TownHP = 30;
			Config.TownMP = 0;

			// Config.SkipImmune = [];

			Scripts = {};

			// Scripts.WPGetter = true;

			// Farm tower racks for Monarch
			Scripts.ChestMania = true;
			Config.ChestMania = {
				Act1: [19, 21, 22, 23, 24, 25],
			};

			Scripts.LKFarm = true;
			Scripts.AncientTunnels = true;
			Config.AncientTunnels.OpenChest = true;
			Config.AncientTunnels.ClearType = 0xf;
			Scripts.Mephisto = true;
			Scripts.Andariel = true;

			// Scripts.ClearAnyArea = true;
			// Config.ClearAnyArea.AreaList = [
			// 	// Spider Cave / Arachnid Lair?
			// 	84

			// 	// Stony Tomb 1
			// 	// 55
			// ];

			Scripts.AutoSmurf = true;
		}
	},

	71: {
		SkillPoints: [sdk.skills.IceBlast],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	72: {
		SkillPoints: [sdk.skills.IceBlast],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Config.MercWatch = true;
			Config.NoTele = false;

			Scripts = {};

			Scripts.ChestMania = true;
			Config.ChestMania = {
				Act1: [19, 21, 22, 23, 24, 25],
			};

			Scripts.AncientTunnels = true;
			Config.AncientTunnels.OpenChest = true;
			Config.AncientTunnels.ClearType = 0xf;

			Scripts.AutoSmurf = true;
		}
	},

	73: {
		SkillPoints: [sdk.skills.IceBlast],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	74: {
		SkillPoints: [sdk.skills.IceBlast],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Scripts = {};

			// Farm tower racks for Monarch
			Scripts.ChestMania = true;
			Config.ChestMania = {
				Act1: [19, 21, 22, 23, 24, 25],
			};

			Scripts.AncientTunnels = true;
			Config.AncientTunnels.OpenChest = true;
			Config.AncientTunnels.ClearType = 0xf;

			Scripts.Andariel = true;

			Scripts.AutoSmurf = true;

			// Scripts.WPGetter = true;
			// Scripts.LKFarm = true;
			// Scripts.Mephisto = true;

		}
	},

	75: {
		SkillPoints: [sdk.skills.IceBlast],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Config.BeltColumn = ["mp", "mp", "mp", "rv"];
			Config.MinColumn = [1, 1, 1, 0];

			Config.Dodge = true;
			Config.DodgeRange = 10;
			Config.DodgeHP = 90;

			Scripts = {};

			Scripts.WPGetter = true;

			Scripts.LKFarm = true;

			// Farm tower racks for Monarch
			Scripts.ChestMania = true;
			Config.ChestMania = {
				Act1: [19, 21, 22, 23, 24, 25],
			};

			Scripts.LKFarm = true;
			Scripts.AncientTunnels = true;
			Config.AncientTunnels.OpenChest = true;
			Config.AncientTunnels.ClearType = 0xf;
			Scripts.Mephisto = true;
			Scripts.Andariel = true;

			// Scripts.AutoSmurf = true;
		}
	},

	76: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Scripts = {};

			Scripts.LKFarm = true;

			// Farm tower racks for Monarch
			Scripts.ChestMania = true;
			Config.ChestMania = {
				Act1: [19, 21, 22, 23, 24, 25],
			};

			Scripts.LKFarm = true;
			Scripts.AncientTunnels = true;
			Config.AncientTunnels.OpenChest = true;
			Config.AncientTunnels.ClearType = 0xf;
			Scripts.Mephisto = true;
			Scripts.Andariel = true;

			// Scripts.AutoSmurf = true;
		}
	},

	77: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	78: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	79: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	80: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			Config.Leader = true;
			Config.PublicMode = 1; // 1 = invite and accept, 2 = accept only, 3 = invite only, 0 = disable
		}
	},

	81: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	82: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	83: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	84: {
		SkillPoints: [sdk.skills.IceBolt],
		StatPoints: [
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	85: {
		SkillPoints: [sdk.skills.IceBolt],
		StatPoints: [
			sdk.stats.Strength,
			sdk.stats.Strength,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			var mercFn = function () {
				var merc = me.getMerc();
				if (!merc) {
					me.overhead("No Merc found");
				}
				me.overhead("Merc found");

				// var i;
				// var mercItems = merc.getItems();
				// for (i = 0; i < mercItems.length; i++) {

				// }
			};
			mercFn();

			Config.UseRejuvHP = 60;

			Scripts = {};

			Scripts.EquippedStats = true;
			Config.EquippedStats.Stats = ["fcr", "fhr", "mf"];

			Scripts.LKFarm = true;
			Scripts.Mephisto = true;
			Scripts.AncientTunnels = true;
			Config.AncientTunnels.OpenChest = true;
			Config.AncientTunnels.ClearType = 0xf;
			Scripts.Andariel = true;
			Scripts.Nihlathak = true;
			Config.Nihlathak.ViperQuit = true;
		}
	},

	86: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	87: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {

		}
	},

	88: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	89: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	90: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
			// Config.UseHP = 91;
			// Config.HPBuffer = 1;

			// Scripts = {};

			// Scripts.EquippedStats = true;
			// Config.EquippedStats.Stats = ["fcr", "fhr", "mf"];

			// Scripts.LKFarm = true;
			// Scripts.Mephisto = true;
			// Scripts.Nihlathak = true;
			// Config.Nihlathak.ViperQuit = true;
			// Scripts.Andariel = true;
			// Scripts.Summoner = true;
			// Scripts.AncientTunnels = true;
			// Config.AncientTunnels.OpenChest = true;
			// Config.AncientTunnels.ClearType = 0xf;

			// Scripts.Duriel = true;
		}
	},

	91: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	92: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	93: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	94: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	95: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	96: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	97: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	98: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	},

	99: {
		SkillPoints: [],
		StatPoints: [
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality,
			sdk.stats.Vitality
		],
		Update: function () {
		}
	}
};
