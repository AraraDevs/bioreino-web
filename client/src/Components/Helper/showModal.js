import bus from './bus';

export default function showModal(properties) {
  bus.emit('modal', properties);
}
