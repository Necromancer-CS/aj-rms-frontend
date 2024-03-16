import ResponsiveAppBar from "../../../../layout/ResponsiveAppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../../../../Css/homePage.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const image1 = "../../../../../public/assets/pexels-nixon-johnson-2293148.jpg";
const image2 =
  "../../../../../public/assets/pexels-karolina-grabowska-5468031.jpg";
const image3 = "../../../../../public/assets/pexels-lukas-298694.jpg";
const image4 =
  "../../../../../public/assets/pexels-mateusz-feliksik-13427981.jpg";
const image5 =
  "../../../../../public/assets/louis-hansel-oyUqUV1Q0Zg-unsplash.jpg";
const image6 =
  "../../../../../public/assets/sam-moghadam-khamseh-QhlCgRucrbA-unsplash.jpg";
const image7 = "../../../../../public/assets/mae-mu-m9pzwmxm2rk-unsplash.jpg";
const image8 = "../../../../../public/assets/mae-mu-TkzdkVn1AyA-unsplash.jpg";

const mainHomePage = () => {
  // javascript
  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="topContent">
              <div className="topMain">
                <Swiper spaceBetween={20} slidesPerView={1}>
                  <SwiperSlide>
                    <div className="image">
                      <img src={image1} alt="" className="home-image" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="image">
                      <img src={image2} alt="" className="home-image" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="image">
                      <img src={image3} alt="" className="home-image" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="image">
                      <img src={image4} alt="" className="home-image" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="bodyContent">
              <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <div className="bodyMain">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <div className="bodyMainLeft">
                        <Card sx={{ maxWidth: 1000 }}>
                          <CardMedia
                            sx={{ height: 400 }}
                            image={image5}
                            title="green iguana"
                          />
                        </Card>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="bodyMainRingt">
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            NEWS
                          </Typography>
                          <br /> <br />
                          <Typography variant="body2" color="text.secondary">
                            Chef. Shigeyuki Furukawa appointed as a “Goodwill
                            Ambassador for the Promotion of Japanese Food.” by
                            the Ministry of Agriculture, Forestry and Fisheries
                            of Japan.
                          </Typography>
                        </CardContent>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="bodyTwoContent">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className="bodyMainTwo">
                    <Typography gutterBottom variant="h3" component="div">
                      Three Experiences, One Location
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={3}>
                      <Card sx={{ maxWidth: 345 }}>
                        <Paper elevation={5}>
                          <CardMedia
                            sx={{ height: 300 }}
                            image={image6}
                            title="green iguana"
                          />
                        </Paper>
                        <div className="TextContent">
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </div>
                      </Card>
                    </Grid>
                    <Grid item xs={3}>
                      <Card sx={{ maxWidth: 345 }}>
                        <Paper elevation={5}>
                          <CardMedia
                            sx={{ height: 300 }}
                            image={image7}
                            title="green iguana"
                          />
                        </Paper>
                        <div className="TextContent">
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </div>
                      </Card>
                    </Grid>
                    <Grid item xs={3}>
                      <Card sx={{ maxWidth: 345 }}>
                        <Paper elevation={5}>
                          <CardMedia
                            sx={{ height: 300 }}
                            image={image8}
                            title="green iguana"
                          />
                        </Paper>
                        <div className="TextContent">
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </div>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="bodyContent">
              <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <div className="bodyMain">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <div className="bodyMainRingt">
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            NEWS
                          </Typography>
                          <br /> <br />
                          <Typography variant="body2" color="text.secondary">
                            Chef. Shigeyuki Furukawa appointed as a “Goodwill
                            Ambassador for the Promotion of Japanese Food.” by
                            the Ministry of Agriculture, Forestry and Fisheries
                            of Japan.
                          </Typography>
                        </CardContent>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="bodyMainLeft">
                        <Card sx={{ maxWidth: 1000 }}>
                          <CardMedia
                            sx={{ height: 400 }}
                            image={image5}
                            title="green iguana"
                          />
                        </Card>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="footerContent">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className="footerMain">
                    <Typography gutterBottom variant="h7" component="div">
                      © 2024 RESTAURANT AJ.
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default mainHomePage;
