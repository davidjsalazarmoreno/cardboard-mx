export type TVideo = 'youtube';

export interface IComment {
  name: string;
  comment: string;
};

export interface IRating {
  up: number;
  down: number;
};

export interface IVideo {
  title: string; 
  description: string;
  category: string;
  type: TVideo, 
  url: string,
  comments?: Array<IComment>,
  rating: IRating;
};
