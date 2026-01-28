export const BulletTypes = {
    nine_mm: {
        speed: 900,
        maxDistance: 1200,
        bounces: 0,
        spread: 0.1,
        size: 4,
    },
    soviet_7_62: {
        speed: 1200,
        maxDistance: 2000,
        bounces: 2,
        spread: 0.04,
        size: 6,
    },
};

export const GunTypes = {
    Pistol: {
        frequency: 500,
        spread: 0.1,
        type: BulletTypes.nine_mm,
        rounds: 6,
        reloadTime: 500,
    },
    AK47: {
        frequency: 100,
        spread: 0.05,
        type: BulletTypes.soviet_7_62,
        rounds: 30,
        reloadTime: 1000,
    }
};