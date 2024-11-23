import styled from "styled-components";
import { theme } from "../../theme";

type TVModalProps = {
  setIsTVModal: (value: boolean) => void;
  videoUrl: string | null;
};

const TVModal = ({ setIsTVModal, videoUrl }: TVModalProps) => {
  return (
    <Overlay onClick={() => setIsTVModal(false)}>
      <Modal>
        {videoUrl && (
          <Iframe
            src={`https://www.youtube.com/embed/${videoUrl}`}
            allowFullScreen
          />
        )}
      </Modal>
    </Overlay>
  );
};

export default TVModal;

// style
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Modal = styled.div`
  width: 50vw;
  height: auto;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid ${theme.white.opaciter};
  box-shadow: 0 0 50px 0 ${theme.white.opaciter};
`;
const Iframe = styled.iframe`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  border: none;
`;
