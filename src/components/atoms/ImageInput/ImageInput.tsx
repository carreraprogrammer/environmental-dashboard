import { IonItem, IonLabel } from "@ionic/react"

interface ImagesInputProps {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}


const ImagesInput: React.FC<ImagesInputProps> = ({
  imageUrl, setImageUrl
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        console.log(imageUrl);
        setImageUrl(imageUrl);
      };
      
      reader.readAsDataURL(file);
    }
  }
  return (
    <IonItem>
      <IonLabel position="stacked">Image</IonLabel>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}></input>
      <img src={imageUrl} alt="invoice image" />
    </IonItem>
  )
}

export default ImagesInput;