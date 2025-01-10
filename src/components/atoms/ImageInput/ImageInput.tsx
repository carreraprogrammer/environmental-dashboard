import { IonItem, IonLabel, isPlatform } from "@ionic/react"
import { useRef } from "react";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

interface ImagesInputProps {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}


const ImagesInput: React.FC<ImagesInputProps> = ({
  imageUrl, setImageUrl
}) => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const base64 = imageUrl.split('base64,')[1];
        setImageUrl(base64);
      };
      reader.readAsDataURL(file); 
    }
  }

  const imageSrc = imageUrl ? `data:image/jpeg;base64,${imageUrl}` : 'assets/images/no-image.jpg';
  
  const handleInputClick = async () => {

    const isCapacitor = isPlatform('capacitor');

    if (isCapacitor) {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt
      });
      setImageUrl(image.base64String || imageUrl);
    } else {
      fileInputRef.current?.click();
    }
  }

  return (
    <IonItem>
      <IonLabel position="stacked">Image</IonLabel>
      <input
        type="file"
        accept="image/*"
        width="100%"
        hidden
        ref={fileInputRef}
        onChange={handleImageChange}></input>
        <img src={imageSrc} alt="invoice image" onClick={handleInputClick} />
    </IonItem>
  )
}

export default ImagesInput;