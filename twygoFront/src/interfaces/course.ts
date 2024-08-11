export interface IVideo {
    title: string;
    size: number; // MB
  }
  
  export interface ICourse {
    _id: string;
    title: string;
    description: string;
    endDate: Date;
    videos: IVideo[];
  }
  