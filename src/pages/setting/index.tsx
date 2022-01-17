import React, { useState } from "react";

import Header from "../mint/header";
import AvatarUpload from "../../components/ui/avatarUpload";
import styles from "./Setting.module.scss";

function Setting(this: any) {

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<object>({});
  const [imageType, setImageType] = useState<string>('image');
  const [avatarImage, setAvatarImage] = useState<File | Blob | null>(null);
  const [bufferAvatar, setBufferAvatar] = useState<string | ArrayBuffer | null>(
    null,
  );

  const onAddAvatar = (item: File | Blob) => {
    if (item) setImageType(item.type.split('/')[0]);
    setErrors((prev) => ({
      ...prev,
      image: '',
    }));
    setAvatarImage(item);
    console.log(avatarImage);
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      setBufferAvatar(binaryStr);
    };
    reader.readAsArrayBuffer(item);
  };

  const deleteAvatar = () => {
    const reader = new FileReader();
    reader.abort();
    setAvatarImage(null);
    setAvatarUrl(null);
    setBufferAvatar(null);
  };

  return (
    <div className="mint-bg">
      <Header />
      <div className={styles.upload}>
        <AvatarUpload
          imageType={imageType}
          image={avatarImage}
          setAvatar={onAddAvatar}
          deleteAvatar={deleteAvatar}
        />
      </div>
    </div>
  );
};

export default Setting;