import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import TableSection from "../Table";

const CardSection = () => {
  return (
    <Container sx={{ mt: "40px" }}>
      <Box sx={{ display: { xs: "block", md: "flex" }, gap: 3 }}>
        <Box sx={{ flexShrink: 0 }}>
          <Card sx={{ maxWidth: { xs: "100%", md: "300px" } }}>
            <CardMedia
              component="img"
              alt="image"
              height="140"
              image="https://images.unsplash.com/photo-1525904971217-668a1229f701?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Restaurant
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus rerum corporis recusandae nemo minus provident omnis
                laudantium in, expedita consectetur quidem voluptatibus beatae
                cum optio consequuntur laborum perspiciatis illo nam. Lorem
                ipsum dolor sit, amet consectetur adipisicing elit. Quis
                officiis unde libero deleniti praesentium debitis dolorem
                perspiciatis!
              </Typography>
              <Typography sx={{mt:2}}><b>Sifarişlərin sayı: 15</b></Typography>
            </CardContent>
          </Card>
        </Box>
        <TableSection />
      </Box>
    </Container>
  );
};

export default CardSection;
