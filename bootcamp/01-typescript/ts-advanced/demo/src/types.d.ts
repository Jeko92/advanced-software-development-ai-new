export type mediaType = "mp3" | "vinyl" | "CD"; // "mp3", "vinyl", "CD"

export type MP3Media = {
  type: "mp3"; // disciminator
  bitrate: number;
};

// Discriminated Union
export type Media = {
  type: mediaType;
  price: number;
  stock: number;
} & (
  | MP3Media
  | {
      type: "vinyl"; // disciminator
      recordType: "LP" | "EP" | "SP";
    }
  | {
      type: "CD"; // disciminator
      hasPrint: boolean;
    }
);
