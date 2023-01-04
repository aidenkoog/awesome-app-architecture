import React from 'react'
import Popup from './Popup'
import { Strings } from '../../../utils/theme'
import { Title, Content } from './OneButton'

export default ({
  visible,
  onClose = () => { },
  onClickOk = () => { },
  onClickCancel = () => { },
  okText = Strings.common.popup.ok,
  cancelText = Strings.common.popup.cancel,
  title,
  content,
}) => {
  return (
    <Popup
      visible={visible}
      onClose={onClose}
      buttons={[
        { text: cancelText, onPress: onClickCancel },
        { text: okText, onPress: onClickOk },
      ]}
    >
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Popup>
  )
}
