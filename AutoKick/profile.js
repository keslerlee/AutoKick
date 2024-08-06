export function Profile(profile) {
    let date = new Date();
    this.last_updated = date.getTime();
    this.magical_power = profile.data.accessories?.magical_power?.total;
    this.bank = Math.floor(profile.data.networth.bank);
    this.hyperion = {
        exists: false,
        stars: 0,
        wither_impact: false,
    }
    this.terminator = {
        exists: false,
        stars: 0,
        power7: false,
    }
    this.gyro = {
        exists: false,
    }
    this.gdrag = {
        exists: false,
        level: 0,
    }
    this.spirit = {
        exists: false,
    }
    this.jellyfish = {
        exists: false,
        level: 0,
    }
    this.pbs = {
        f7: -1,
        m4: -1,
        m5: -1,
        m6: -1,
        m7: -1,
    }
    this.comps = {
        f7: 0,
        m4: 0,
        m5: 0,
        m6: 0,
        m7: 0,
    }
    if ("dungeons" in profile.raw) {
        if ("fastest_time_s_plus" in profile.raw.dungeons.dungeon_types.catacombs && "7" in profile.raw.dungeons.dungeon_types.catacombs.fastest_time_s_plus) {
            this.pbs.f7 = profile.raw.dungeons.dungeon_types.catacombs.fastest_time_s_plus["7"] / 1000;
        }
        if ("7" in profile.raw.dungeons.dungeon_types.catacombs.tier_completions) {
            this.comps.f7 = profile.raw.dungeons.dungeon_types.catacombs.tier_completions["7"];
        }
        if ("fastest_time_s_plus" in profile.raw.dungeons.dungeon_types.master_catacombs) {
            this.pbs.m4 = profile.raw.dungeons.dungeon_types.master_catacombs.fastest_time_s_plus["4"] / 1000;
            this.pbs.m5 = profile.raw.dungeons.dungeon_types.master_catacombs.fastest_time_s_plus["5"] / 1000;
            this.pbs.m6 = profile.raw.dungeons.dungeon_types.master_catacombs.fastest_time_s_plus["6"] / 1000;
            this.pbs.m7 = profile.raw.dungeons.dungeon_types.master_catacombs.fastest_time_s_plus["7"] / 1000;
        }
        if ("tier_completions" in profile.raw.dungeons.dungeon_types.master_catacombs) {
            let temp = ["4", "5", "6", "7"];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i] in profile.raw.dungeons.dungeon_types.master_catacombs.tier_completions) {
                    this.comps["m" + temp[i]] = profile.raw.dungeons.dungeon_types.master_catacombs.tier_completions[temp[i]];
                }
            }
        }
    }
    let weapons = profile.data.items.weapons.weapons;
    for (let i = 0; i < weapons.length; i++) {
        if (weapons[i].tag.ExtraAttributes.id == "HYPERION" || weapons[i].tag.ExtraAttributes.id == "VALKYRIE" || weapons[i].tag.ExtraAttributes.id == "ASTRAEA" || weapons[i].tag.ExtraAttributes.id == "SCYLLA") {
            this.hyperion.exists = true;
            if ("upgrade_level" in weapons[i].tag.ExtraAttributes) this.hyperion.stars = Math.max(this.hyperion.stars, weapons[i].tag.ExtraAttributes.upgrade_level);
            else if ("dungeon_item_level" in weapons[i].tag.ExtraAttributes) this.hyperion.stars = Math.max(this.hyperion.stars, weapons[i].tag.ExtraAttributes.dungeon_item_level);
            if ("ability_scroll" in weapons[i].tag.ExtraAttributes && weapons[i].tag.ExtraAttributes.ability_scroll.length == 3) this.hyperion.wither_impact = true;
        } else if (weapons[i].tag.ExtraAttributes.id == "TERMINATOR") {
            this.terminator.exists = true;
            if ("upgrade_level" in weapons[i].tag.ExtraAttributes) this.terminator.stars = Math.max(this.terminator.stars, weapons[i].tag.ExtraAttributes.upgrade_level);
            else if ("dungeon_item_level" in weapons[i].tag.ExtraAttributes) this.terminator.stars = Math.max(this.terminator.stars, weapons[i].tag.ExtraAttributes.dungeon_item_level);
            if (weapons[i].tag.ExtraAttributes.enchantments.power == 7) this.terminator.power7 = true;
        } else if (weapons[i].tag.ExtraAttributes.id == "GYROKINETIC_WAND") {
            this.gyro.exists = true;
        }
    }
    let pets = profile.data.pets.pets;
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].type == "GOLDEN_DRAGON") {
            this.gdrag.exists = true;
            this.gdrag.level = Math.max(this.gdrag.level, pets[i].level.level);
        } else if (pets[i].type == "SPIRIT") {
            if (pets[i].tier == "LEGENDARY") this.spirit.exists = true;
        } else if (pets[i].type == "JELLYFISH") {
            this.jellyfish.exists = true;
            this.jellyfish.level = Math.max(this.jellyfish.level, pets[i].level.level);
        }
    }
    
}
