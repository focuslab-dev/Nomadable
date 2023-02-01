import sharp from "sharp";
import AWS from "aws-sdk";
import imageType from "image-type";

export const STORAGE_URI = "https://nomadable.fra1.cdn.digitaloceanspaces.com";
const BUCKET_NAME = "nomadable";

const spacesEndpoint = new AWS.Endpoint("fra1.digitaloceanspaces.com");

const s3 = new AWS.S3({
  endpoint: spacesEndpoint.href,
  accessKeyId: "DO00PZXVKMJXXQVPGMPW",
  secretAccessKey: "ea67H8+iqojICHPcpl/uzt6zKQx+zXD/73DHjj2bLUw",
});

/**
 * File Name Generator
 */

export const generateImageUrl = (fileName: string) => {
  return `${STORAGE_URI}/${fileName}`;
};

/**
 * Functions
 */

// export const removeImage = async (url: string) => {
//   if (!url) return;
//   try {
//     const fileName = url.replace(STORAGE_URI, "").replace("/", "");
//     const params = {
//       Bucket: BUCKET_NAME,
//       Key: fileName,
//     };

//     await s3.deleteObject(params).promise();
//     return;
//   } catch (err) {
//     throw Error;
//   }
// };

export const removeImages = async (urls: string[]) => {
  if (urls.length < 1) return;
  try {
    const objects = urls.map((url) => ({
      Key: url.replace(STORAGE_URI, "").replace("/", ""),
    }));
    const params = {
      Bucket: BUCKET_NAME,
      Delete: { Objects: objects },
    };

    await s3.deleteObjects(params).promise();
    return;
  } catch (err) {
    throw Error;
  }
};

const saveImage = async (fileName: string, buff: Buffer) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buff,
      ACL: "public-read",
      ContentType: "image/jpeg",
    };

    await s3.putObject(params).promise();
    const url = generateImageUrl(fileName);

    return url;
  } catch (err) {
    throw err;
  }
};

const reduceSizeImage = async (
  imageBuff: Buffer,
  maxPixel: number,
  quality: number
) => {
  try {
    const imageFile = await imageType(imageBuff);

    const resized = await sharp(imageBuff)
      .withMetadata()
      .jpeg({ quality, progressive: true })
      // .webp({ quality })
      .resize({
        width: maxPixel,
        height: maxPixel,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toBuffer();
    return resized;
  } catch (err) {
    throw JSON.stringify(err);
  }
};

export const saveSingleImage = async (
  fileName: string,
  base64: string,
  width: number
) => {
  const buff = Buffer.from(base64, "base64");
  const buffResized = await reduceSizeImage(buff, width, 95);
  const url = await saveImage(fileName, buffResized);
  return url;
};
