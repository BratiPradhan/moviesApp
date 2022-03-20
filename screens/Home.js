import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaries,
} from '../services/service';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';

const dimensions = Dimensions.get('screen');
export const Home = () => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaries, setDocumentary] = useState();
  const [popularTv, setPopularTv] = useState();
  const [error, setError] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaries(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentariesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });
          setMoviesImages(moviesImagesArray);

          setPopularMovies(popularMoviesData);

          setPopularTv(popularTvData);

          setFamilyMovies(familyMoviesData);

          setDocumentary(documentariesData);
        },
      )
      .catch(err => setError(err));

    // getUpcomingMovies()
    //   .then(movies => {
    //     const moviesImagesArray = [];
    //     movies.forEach(movie => {
    //       moviesImagesArray.push(
    //         'https://image.tmdb.org/t/p/w500' + movie.poster_path,
    //       );
    //     });

    //     setMoviesImages(moviesImagesArray);
    //   })
    //   .catch(err => setError(err));

    // getPopularMovies()
    //   .then(movies => {
    //     setPopularMovies(movies);
    //   })
    //   .catch(err => setError(err));

    // getPopularTv()
    //   .then(tvs => {
    //     setPopularTv(tvs);
    //   })
    //   .catch(err => setError(err));
    // getFamilyMovies()
    //   .then(movies => {
    //     setFamilyMovies(movies);
    //   })
    //   .catch(err => setError(err));
    // getDocumentaries()
    //   .then(movies => {
    //     setDocumentary(movies);
    //   })
    //   .catch(err => setError(err));
  }, []);
  return (
    <React.Fragment>
      <ScrollView>
        {/* moviesImages */}
        {moviesImages && (
          <View style={styles.sliderContainer}>
            <SliderBox
              images={moviesImages}
              sliderBoxHeight={dimensions.height / 1.5}
              autoplay={true}
              dotStyle={styles.sliderStyle}
              circleLoop={true}
            />
          </View>
        )}

        {/* popularMovies */}
        {popularMovies && (
          <View style={styles.carousel}>
            <List title="Popular Movies" content={popularMovies} />
          </View>
        )}

        {/* popularTv */}
        {popularTv && (
          <View style={styles.carousel}>
            <List title="Popular TV Shows" content={popularTv} />
          </View>
        )}

        {/* familyMovies */}
        {familyMovies && (
          <View style={styles.carousel}>
            <List title="Family Movies" content={familyMovies} />
          </View>
        )}

        {/* documentaries */}
        {documentaries && (
          <View style={styles.carousel}>
            <List title="Documentaries" content={documentaries} />
          </View>
        )}
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
