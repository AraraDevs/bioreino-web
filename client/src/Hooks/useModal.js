import bus from '../Components/Helper/bus';

export default function useModal() {
  function setModal(title, desc, txtDeny, txtConfirm, href) {
    bus.emit('modal', {
      title,
      description: desc,
      textDeny: txtDeny,
      textConfirm: txtConfirm,
      href,
    });
  }

  return { setModal };
}
