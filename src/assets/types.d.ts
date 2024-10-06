export interface Pokemon {
    name: string;
    sprites: {
        front_default: string;
    };
    images: Image[];
}

interface Image {
    url: string;
    width: number;
    height: number;
}