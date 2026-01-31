export const BulletTypes = {
    _9_mm: {
        name: "9 mm",
        speed: 900,
        maxDistance: 1200,
        bounces: 0,
        size: 4,
    },
    _44_magnum: {
        name: "9 mm",
        speed: 1200,
        maxDistance: 2000,
        bounces: 2,
        size: 6,
    },
};

export const GunTypes = {
    glock_17: {
        auto: false,
        frequency: 500,
        spread: 0.1,
        type: BulletTypes._9_mm,
        rounds: 16,
        reloadTime: 500,
        length: 30,
        recoil: 3,
    },
    revolver: {
        auto: false,
        frequency: 200,
        spread: 0.02,
        type: BulletTypes._44_magnum,
        rounds: 6,
        reloadTime: 2000,
        length: 40,
        recoil: 6,
    },
    ak_47: {
        auto: true,
        frequency: 100,
        spread: 0.01,
        type: BulletTypes._44_magnum,
        rounds: 30,
        reloadTime: 2000,
        length: 60,
        recoil: 7,
    },
};