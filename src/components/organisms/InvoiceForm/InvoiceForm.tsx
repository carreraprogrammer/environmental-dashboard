import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MainPagesLayout from '../../layouts/MainLayout/MainLayout';
import ImagesInput from '../../atoms/ImageInput/ImageInput';

const InvoiceForm: React.FC = () => {

  const [imageUrl, setImageUrl] = React.useState('assets/images/no-image.jpg');


  return (
    <div>
      <ImagesInput
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
    </div>
      
  );
};

export default InvoiceForm;