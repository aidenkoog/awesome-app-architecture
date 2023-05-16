import styled from 'styled-components'
import { Colors, Fonts, Strings } from '../../../utils/theme'
import Popup from './Popup'

export const Title = styled.Text`
  font-family: ${Fonts.family.Medium};
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  margin-top: 20px;
  color: ${Colors.titlePopupText};
  width: 100%;
  text-align: left;
`
export const Content = styled.Text`
  padding-top: 20px;
  width: 100%;
  padding-bottom: 20px;
  padding-left: 0px;
  padding-right: 0px;
  margin-left: 0px;
  margin-right: 0px;
  font-family: ${Fonts.family.Regular};
  font-size: 18px;
  line-height: 25px;
  color: ${Colors.charcoalGreyTwo};
  text-align: left;
`

export default ({
  visible,
  onClose = () => { },
  onClickConfirm = () => { },
  confirmText = Strings.common.popup.ok,
  title,
  content,
}) => {
  return (
    <Popup
      visible={visible}
      onClose={onClose}
      buttons={[{ text: confirmText, onPress: onClickConfirm }]}
    >
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Popup>
  )
}
