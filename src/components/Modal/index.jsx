import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  bgcolor: "background.paper",
  border: "2px solid rgba(224, 224, 224, 1)",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const ModalSection = ({ showModal, setShowModal, ...modalContent }) => {
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <Box sx={style}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  py: 1,
                  px: 2,
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderRadius: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Masa:</b> {modalContent.tableName}
              </Typography>
              <Typography
                sx={{
                  py: 1,
                  px: 2,
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderRadius: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Xidmətçi:</b> {modalContent.servant}
              </Typography>
              <Typography
                sx={{
                  py: 1,
                  px: 2,
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderRadius: "5px",
                  whiteSpace: "nowrap",
                  color: [modalContent.status === "unending" ? "red" : "green"],
                }}
              >
                <b>Status:</b>{" "}
                {modalContent.status === "unending"
                  ? "Sonlanmayan"
                  : "Sonlanan"}
              </Typography>
              <Typography
                sx={{
                  py: 1,
                  px: 2,
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderRadius: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Məbləğ:</b> {modalContent.amount} AZN
              </Typography>
              <Typography
                sx={{
                  py: 1,
                  px: 2,
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderRadius: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Sonlanma Tarixi:</b> {modalContent.expirationDate}
              </Typography>
              <Typography
                sx={{
                  py: 1,
                  px: 2,
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderRadius: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Məhsulun adı:</b> {modalContent.productName}
              </Typography>
              <Typography
                sx={{
                  py: 1,
                  px: 2,
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderRadius: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Miqdar:</b> {modalContent.quantity}
              </Typography>
              <Typography
                sx={{
                  py: 1,
                  px: 2,
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderRadius: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Sifariş Saatı:</b> {modalContent.date}
              </Typography>
              <Typography
                sx={{
                  py: 1,
                  px: 2,
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderRadius: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Gözləmə:</b>{" "}
                {modalContent.orderStatus === "refusal"
                  ? "imtina"
                  : modalContent.waitingTime}
              </Typography>
              <Typography
                sx={{
                  py: 1,
                  px: 2,
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderRadius: "5px",
                  whiteSpace: "nowrap",
                  color: [
                    modalContent.orderStatus === "refusal"
                      ? "gray"
                      : modalContent.orderStatus === "expected"
                      ? "gray"
                      : "green",
                  ],
                }}
              >
                <b>Sifariş Status:</b>{" "}
                {modalContent.orderStatus === "expected"
                  ? "gözləmədə"
                  : modalContent.orderStatus === "refusal"
                  ? "imtina"
                  : "verildi"}
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalSection;
