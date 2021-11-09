import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog , Portal, Provider } from 'react-native-paper';

const CustomDialog=({title,message,visible,setVisible,action=undefined})=>{


    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);
    return (
        
          <View>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog} dismissable={false}> 
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>{message}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={()=>{
                    hideDialog()
                    action && action()
                  }}>Ok</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        
      );
}

export default CustomDialog;