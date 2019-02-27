export interface Movie{
    _id: string;
    title: string;
    director: string;
    description: string;
    youtubeTrailer: string;
    durationInMin: number;
    releaseYear: number;
    posterImagePath: string;
    wideImagePath: string;
    isDisplaying: boolean;
    genreList: string[];
}


//another way to do it:
/*export class Movie {
    constructor(
        public _id: string = undefined,
        public title: string = undefined,
        public director: string = undefined,
        public description: string = undefined,
        public youtubeTrailer: string = undefined,
        public durationInMin: number = undefined,
        public releaseYear: number = undefined,
        public posterImagePath: string = undefined,
        public wideImagePath: string = undefined,
        public isDisplaying: boolean = false;
        public genreList: string[] = []
    ) { }
}*/