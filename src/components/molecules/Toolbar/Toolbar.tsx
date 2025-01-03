import {
  IonButton, IonIcon,
  IonInput,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  caretForward,
  chevronBack,
  menuOutline, searchOutline,
} from 'ionicons/icons';
import { RiLogoutBoxLine } from "react-icons/ri";
import React, {
  memo, useRef
} from 'react';
import useIsMobile from '../../../hooks/useIsMobile';
import './Toolbar.css';

export interface ToolbarButton {
  name: string;
  icon: any;
  click: () => void;
  triggerId: string;
  show: boolean;
}

type CustomButton= () => JSX.Element;

interface ToolbarProps {
  name: string;
  menu?: boolean;
  back?: boolean;
  search?: boolean;
  searchMode?: boolean;
  setSearchMode?: (searchMode: boolean) => void;
  setSearchText?: (searchText: string) => void;
  searchText?: string;
  handleBack?: () => void;
  isLoading?: boolean;
  customButtons?: CustomButton[];
  logoutIcon?: boolean;
  customHandleSearch?: (e: any) => void;
}

const Toolbar: React.FC<ToolbarProps> = memo(({
  name,
  menu,
  back = false,
  search = false,
  searchMode = false,
  setSearchMode = () => {},
  setSearchText = () => {},
  searchText,
  handleBack,
  isLoading = false,
  customButtons = [],
  logoutIcon = true,
}) => {
  const isMobile = useIsMobile();

  const logout = () => {
    console.log('logout');
  };

  const handleSearchInput = (e: any) => {
      setSearchText(e.detail.value!);
  };

  const searchRef = useRef<HTMLIonInputElement>(null);

  const toggleSearchMode = () => {
    if (searchMode) {
      setSearchMode(false);
      setSearchText('');
    } else {
      setSearchMode(!searchMode);
      searchRef.current?.setFocus();
    }
  };

  return (
    <IonToolbar color="dark" className="toolbar" id="main-pages-toolbar" style={{
      paddingLeft: back ? '0px' : '16px',
    }}>
      {menu && (
        <IonButton slot="start" fill="clear" className="toolbar-button ion-no-padding">
          <IonIcon icon={menuOutline} className="toolbar-icon" />
        </IonButton>
      )}
      <div className="toolbar-title-link" style={{ textDecoration: 'none', color: 'inherit' }}>
        <IonTitle className={`toolbar-title ${isMobile && searchMode ? 'hidden' : ''}`} slot="start">{name}</IonTitle>
      </div>
      <>
      {back && (
        <IonButton fill="clear" slot="start" className="ion-no-padding toolbar-button" onClick={handleBack}>
          <IonIcon icon={chevronBack} className="toolbar-back-icon toolbar-icon" />
        </IonButton>
      )}
      {search && (
        <div slot="end" className={`ion-no-padding toolbar-search-wrapper ${searchMode ? 'search' : ''}`}>
          <IonButton fill="clear" slot="start" className="ion-no-padding toolbar-button" onClick={toggleSearchMode}>
            <IonIcon color={searchMode ? 'primary' : 'light'} icon={searchMode ? caretForward : searchOutline} className="toolbar-search-icon toolbar-icon" />
          </IonButton>
          <IonInput
            value={searchText}
            onIonInput={handleSearchInput}
            // onIonChange={(e) => setSearchText(e.detail.value!)}
            className="toolbar-search-input"
            placeholder=""
            ref={searchRef}
            clearInput
          />
        </div>
      )}
      {
        customButtons.map((renderFunction: any, index) => (
          renderFunction()
        ))
      }
      { logoutIcon &&
        <IonButton fill="clear" slot="end" color="light" className="ion-no-padding toolbar-button logout-icon" onClick={logout}>
          <RiLogoutBoxLine className="toolbar-icon" />
        </IonButton>
      }
      {
        isLoading && (
          <IonProgressBar type="indeterminate" />
        )
      }
      </>
    </IonToolbar>
  );
});

export default Toolbar;
