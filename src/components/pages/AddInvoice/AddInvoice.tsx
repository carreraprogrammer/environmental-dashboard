import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MainPagesLayout from '../../layouts/MainLayout/MainLayout';
import InvoiceForm from '../../organisms/InvoiceForm/InvoiceForm';

const AddInvoice: React.FC = () => {
  return (
    <MainPagesLayout 
      title="Invoice Form"
      search
    >
      <IonContent fullscreen>
        <InvoiceForm />
      </IonContent>
    </MainPagesLayout>
      
  );
};

export default AddInvoice;