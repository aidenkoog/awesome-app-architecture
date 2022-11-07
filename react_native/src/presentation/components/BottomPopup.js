import React from 'react'
import { Modal, View } from 'react-native'

class BottomPopup extends React.PureComponent {
    render() {
        const { onRequestClose } = this.props
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    onRequestClose()
                }}>
                <View style={{
                    flex: 1, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    {this.props.children}
                </View>
            </Modal>
        )
    }
}

export default BottomPopup