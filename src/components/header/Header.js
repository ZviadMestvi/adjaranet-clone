import { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../store/context';
import AuthModal from '../authentication modal/AuthModal';
import classes from './Header.module.css';

import MobileHeader from './MobileHeader';

const Header = () => {
  const context = useContext(AppContext);
  const [navbar, setNavbar] = useState(false);
  const strokeColor =
    !navbar || context.theme ? classes.whiteStroke : classes.greyStroke;
  const fillColor =
    !navbar || context.theme ? classes.whiteFill : classes.greyFill;

  const changeBackground = () => {
    if (window.scrollY >= 300) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const searchBtnHandler = () => {
    window.scrollTo(0, 0);
  };

  window.addEventListener('scroll', changeBackground);

  return (
    <Fragment>
      <div
        data-theme={context.theme ? 'dark' : ''}
        className={`${classes.wrapper} ${navbar && classes.scrolledHeader}`}
      >
        <div className={classes.topLine} />

        <div className={classes.headerContainer}>
          <div className={classes.logoContainer}>
            <Link to="/">
              <svg
                width="171"
                height="45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#1683c6"
                  d="M97.148 44.547c12.333 0 22.331-9.972 22.331-22.273C119.479 9.972 109.481 0 97.149 0 84.814 0 74.816 9.972 74.816 22.274c0 12.301 9.998 22.273 22.331 22.273z"
                ></path>
                <path
                  className={fillColor}
                  d="M11.905 29.312h-2.13v-5.76c0-.512-.098-1.003-.295-1.475a3.99 3.99 0 0 0-.808-1.219 3.778 3.778 0 0 0-1.222-.806 3.816 3.816 0 0 0-1.478-.295c-.532 0-1.025.099-1.498.295a3.91 3.91 0 0 0-1.202.806 3.766 3.766 0 0 0-.808 1.22 3.788 3.788 0 0 0-.296 1.474c0 .53.099 1.041.296 1.494.197.471.473.884.808 1.219.335.353.749.629 1.202.825a3.77 3.77 0 0 0 1.498.295c.512 0 1.005-.098 1.458-.275a3.743 3.743 0 0 0 1.203-.787v2.537a5.307 5.307 0 0 1-1.281.471 6.354 6.354 0 0 1-1.4.158 5.787 5.787 0 0 1-2.325-.472 6.056 6.056 0 0 1-1.893-1.278 6.018 6.018 0 0 1-1.28-1.907C.137 25.105 0 24.338 0 23.512c0-.825.158-1.592.453-2.32a5.934 5.934 0 0 1 1.281-1.887 6.546 6.546 0 0 1 1.893-1.278 5.786 5.786 0 0 1 2.325-.472c.789 0 1.518.138 2.208.433.69.275 1.3.668 1.833 1.16a5.969 5.969 0 0 1 1.3 1.73c.336.668.552 1.376.612 2.123v6.31zM26.805 13.27v10.282c0 .825-.158 1.592-.473 2.32a6.369 6.369 0 0 1-1.281 1.906c-.532.55-1.163.964-1.892 1.278a5.642 5.642 0 0 1-2.267.472 5.88 5.88 0 0 1-2.345-.472 6.144 6.144 0 0 1-1.912-1.278 6.019 6.019 0 0 1-1.281-1.907 5.746 5.746 0 0 1-.473-2.32c0-.825.157-1.592.473-2.32a6.27 6.27 0 0 1 1.28-1.886 6.386 6.386 0 0 1 1.913-1.278 5.882 5.882 0 0 1 2.345-.472c.473 0 .927.059 1.38.177.453.118.867.275 1.261.491v2.576a3.45 3.45 0 0 0-1.202-.826 3.623 3.623 0 0 0-1.439-.295 3.77 3.77 0 0 0-1.498.295 3.531 3.531 0 0 0-1.222.826 4.37 4.37 0 0 0-.847 1.219 3.808 3.808 0 0 0-.316 1.474c0 .53.099 1.042.316 1.494.197.472.492.865.847 1.219.355.334.769.61 1.222.826.473.196.966.314 1.498.314.513 0 1.005-.098 1.478-.314a3.644 3.644 0 0 0 1.203-.826c.335-.334.61-.747.808-1.219.197-.472.295-.963.295-1.494V13.27h2.129zM30.313 17.85h2.129V31.259c0 .668-.118 1.18-.335 1.533-.237.354-.473.61-.73.787-.315.177-.65.295-1.064.314h-3.33v-2.064h2.897c.216 0 .355-.098.414-.295a.59.59 0 0 0 .02-.314V17.85zM47.52 29.312H45.37v-5.76c0-.512-.098-1.003-.295-1.475a3.988 3.988 0 0 0-.808-1.219 3.778 3.778 0 0 0-1.222-.806 3.817 3.817 0 0 0-1.479-.295c-.532 0-1.024.099-1.498.295a3.911 3.911 0 0 0-1.202.806 3.765 3.765 0 0 0-.808 1.22 3.788 3.788 0 0 0-.295 1.474c0 .53.098 1.041.295 1.494.197.471.473.884.808 1.219.335.353.75.629 1.203.825a3.77 3.77 0 0 0 1.497.295c.513 0 1.006-.098 1.459-.275a3.743 3.743 0 0 0 1.202-.787v2.537a5.307 5.307 0 0 1-1.28.471 6.353 6.353 0 0 1-1.4.158 5.787 5.787 0 0 1-2.326-.472 6.057 6.057 0 0 1-1.892-1.278 6.016 6.016 0 0 1-1.281-1.907c-.316-.727-.453-1.494-.453-2.32 0-.825.157-1.592.453-2.32a5.932 5.932 0 0 1 1.28-1.887 6.547 6.547 0 0 1 1.893-1.278 5.786 5.786 0 0 1 2.326-.472c.788 0 1.517.138 2.207.433.69.275 1.301.668 1.833 1.16a5.966 5.966 0 0 1 1.301 1.73c.335.668.552 1.376.611 2.123v6.31h.02zM52.703 18.244c0 .059 0 .098.02.137.04.099.099.138.178.118.137-.059.275-.118.433-.177.138-.059.296-.098.453-.157a7.96 7.96 0 0 1 .868-.216c.315-.06.65-.099.965-.099v2.104c-.374.04-.71.079-1.005.118a5.757 5.757 0 0 0-.788.197 3.424 3.424 0 0 0-.71.255c-.04.02-.098.04-.157.06-.099.078-.138.196-.138.333v8.375h-2.129V17.85h2.03v.394h-.02zM69.653 29.312h-2.128v-5.76c0-.512-.099-1.003-.296-1.475a3.989 3.989 0 0 0-.808-1.219 3.778 3.778 0 0 0-1.222-.806 3.816 3.816 0 0 0-1.478-.295c-.532 0-1.025.099-1.498.295a3.911 3.911 0 0 0-1.202.806 3.765 3.765 0 0 0-.808 1.22 3.788 3.788 0 0 0-.296 1.474c0 .53.099 1.041.296 1.494.197.471.473.884.808 1.219.335.353.749.629 1.202.825a3.77 3.77 0 0 0 1.498.295c.512 0 1.005-.098 1.458-.275a3.744 3.744 0 0 0 1.203-.787v2.537a5.307 5.307 0 0 1-1.281.471 6.354 6.354 0 0 1-1.4.158 5.787 5.787 0 0 1-2.325-.472 6.056 6.056 0 0 1-1.893-1.278 6.02 6.02 0 0 1-1.28-1.907c-.316-.727-.454-1.494-.454-2.32 0-.825.158-1.592.453-2.32a5.935 5.935 0 0 1 1.281-1.887 6.546 6.546 0 0 1 1.893-1.278 5.785 5.785 0 0 1 2.325-.472c.789 0 1.518.138 2.208.433.69.275 1.3.668 1.833 1.16a5.968 5.968 0 0 1 1.3 1.73c.335.668.552 1.376.611 2.123v6.31z"
                  fill="#fff"
                ></path>
                <path
                  fill="#fff"
                  d="M79.45 17.85h2.128v11.462h-2.129V17.85zm9.341 5.682c0-1.16-.295-2.084-.886-2.772-.592-.688-1.459-1.022-2.602-1.022-.591 0-1.084.098-1.498.295a3.866 3.866 0 0 0-1.084.766v-2.457c.158-.157.335-.275.572-.374.216-.098.453-.157.67-.216.236-.059.453-.098.65-.118.197-.02.375-.04.513-.04.906 0 1.714.139 2.444.414.729.275 1.32.668 1.833 1.18.492.51.867 1.14 1.143 1.867a7.39 7.39 0 0 1 .394 2.457h-.02v5.78h-2.109v-5.76h-.02zM99.868 17.615c.828 0 1.597.157 2.326.471a5.964 5.964 0 0 1 3.134 3.166c.315.727.453 1.494.453 2.32 0 .176 0 .334-.02.432a5.61 5.61 0 0 0-.059.413h-9.638c.178.963.592 1.75 1.242 2.339.65.59 1.518.885 2.582.885.769 0 1.399-.158 1.912-.452a4.397 4.397 0 0 0 1.281-1.121h2.207c-.492 1.022-1.222 1.848-2.168 2.497-.965.648-2.03.963-3.232.963a5.785 5.785 0 0 1-2.326-.472 6.289 6.289 0 0 1-1.892-1.278 5.963 5.963 0 0 1-1.261-1.907c-.316-.727-.454-1.494-.454-2.32 0-.825.158-1.592.454-2.32a5.984 5.984 0 0 1 1.261-1.886 6.055 6.055 0 0 1 1.892-1.278 5.953 5.953 0 0 1 2.306-.452zm3.863 4.934a3.121 3.121 0 0 0-.453-1.14 3.298 3.298 0 0 0-.847-.963 4.511 4.511 0 0 0-1.163-.669 3.72 3.72 0 0 0-1.42-.256c-.512 0-1.005.08-1.418.236a3.834 3.834 0 0 0-1.144.65c-.335.274-.61.589-.808.962a3.65 3.65 0 0 0-.453 1.16h7.706v.02zM114.67 27.208v2.104h-3.41a1.928 1.928 0 0 1-1.025-.335c-.256-.176-.492-.432-.709-.786-.217-.354-.315-.884-.315-1.573V13.27h2.069v4.58h2.641v2.104h-2.641v6.625c-.02.098 0 .216.039.315.04.078.079.137.158.196.059.06.178.099.316.099h2.877v.02z"
                ></path>
                <path
                  className={fillColor}
                  d="M125.313 29.312h-2.188v-2.183h2.188v2.183zM131.916 27.503a3.93 3.93 0 0 0 1.872-.452 4.165 4.165 0 0 0 1.4-1.219h2.306a6.8 6.8 0 0 1-.887 1.514 5.548 5.548 0 0 1-1.281 1.16 6.446 6.446 0 0 1-1.577.747 6.135 6.135 0 0 1-1.813.275 6.126 6.126 0 0 1-2.326-.452c-.729-.315-1.36-.728-1.892-1.278a6.152 6.152 0 0 1-1.281-1.887c-.316-.728-.454-1.494-.454-2.32 0-.845.158-1.632.454-2.36.315-.727.729-1.356 1.281-1.886a6.543 6.543 0 0 1 1.892-1.278 5.787 5.787 0 0 1 2.326-.472c.63 0 1.222.098 1.813.275a5.584 5.584 0 0 1 1.577.767c.473.334.906.727 1.281 1.18.374.451.67.963.887 1.513h-2.306a3.99 3.99 0 0 0-1.38-1.238c-.571-.315-1.202-.452-1.892-.452-.552 0-1.064.098-1.537.314a3.869 3.869 0 0 0-1.242.845 4.045 4.045 0 0 0-.848 1.259 4.049 4.049 0 0 0-.315 1.553c0 .55.099 1.061.315 1.533.198.472.493.885.848 1.239.355.353.769.629 1.242.825.473.197.985.295 1.537.295zM145.831 17.615c.828 0 1.616.157 2.345.471.73.315 1.38.747 1.912 1.278s.966 1.16 1.281 1.887c.316.728.473 1.514.473 2.36 0 .825-.157 1.592-.473 2.32a6.035 6.035 0 0 1-1.281 1.887c-.532.55-1.163.963-1.912 1.277-.729.315-1.517.453-2.345.453a6.128 6.128 0 0 1-2.326-.452c-.729-.315-1.36-.728-1.892-1.278a6.15 6.15 0 0 1-1.281-1.888c-.315-.727-.453-1.494-.453-2.32 0-.845.157-1.631.453-2.358.315-.728.729-1.357 1.281-1.888a6.555 6.555 0 0 1 1.892-1.278 5.785 5.785 0 0 1 2.326-.471zm0 9.888c.552 0 1.064-.098 1.557-.295a3.885 3.885 0 0 0 1.261-.825c.355-.354.631-.767.848-1.239a3.95 3.95 0 0 0 .315-1.533c0-.55-.098-1.062-.315-1.553a3.934 3.934 0 0 0-2.109-2.104 4.075 4.075 0 0 0-1.557-.315c-.552 0-1.064.099-1.537.315a3.869 3.869 0 0 0-1.242.845 4.045 4.045 0 0 0-.848 1.259 4.049 4.049 0 0 0-.315 1.553c0 .55.099 1.061.315 1.533.197.472.493.885.848 1.239.355.353.769.629 1.242.825.473.197.985.295 1.537.295zM154.878 17.85h2.128v11.462h-2.128V17.85zm6.918 4.581c0-.295-.02-.59-.04-.904a2.45 2.45 0 0 0-.256-.865 1.715 1.715 0 0 0-.65-.649c-.296-.177-.69-.256-1.222-.256-.04 0-.198 0-.533.02-.315.02-.611.079-.867.177v-1.946c.355-.157.71-.256 1.045-.295.355-.04.611-.06.768-.06.651 0 1.222.139 1.676.394.453.275.847.63 1.182 1.081.355-.53.868-.924 1.538-1.14a6.022 6.022 0 0 1 2.03-.334c.591 0 1.163.079 1.715.236a3.256 3.256 0 0 1 1.438.845c.414.393.749.924 1.005 1.573.257.649.375 1.474.375 2.457v6.507h-2.129v-6.88c0-.295-.039-.59-.098-.905a2.613 2.613 0 0 0-.375-.865c-.177-.255-.433-.471-.768-.648-.335-.177-.749-.256-1.281-.256-.513 0-.907.079-1.222.256-.316.177-.572.373-.749.629-.178.255-.316.53-.375.865-.059.314-.098.629-.098.924v6.88h-2.109v-6.841z"
                  fill="#fff"
                ></path>
              </svg>
            </Link>
          </div>

          <div className={classes.categoriesContainer}>
            <div className={`${classes.tvIcon} ${classes.category}`}>
              <a href="#">
                <svg
                  className="svg-icon svg-icon--tv"
                  width="31"
                  height="24"
                  viewBox="0 0 31 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1.25"
                    y="0.75"
                    width="28.5"
                    height="19.9083"
                    rx="3.25"
                    strokeWidth="1.5"
                    className={strokeColor}
                  ></rect>
                  <path
                    className={fillColor}
                    d="M15.1671 7H9.5V8.21563H11.5547V15H13.024V8.21563H15.0124L15.1671 7Z"
                  ></path>
                  <path
                    className={fillColor}
                    d="M21.5 7H20.0087L18.3958 13.6454L16.7388 7H15.1701L17.501 15H19.2354L21.5 7Z"
                  ></path>
                  <rect
                    x="10"
                    y="22.5352"
                    width="11.2675"
                    height="1.46478"
                    className={strokeColor}
                  ></rect>
                </svg>
                <p className={`${strokeColor} ${classes.categoryText}`}>TV</p>
              </a>
            </div>
            <div className={`${classes.moviesIcon} ${classes.category}`}>
              <a href="#">
                <svg
                  className="svg-icon svg-icon--movies"
                  width="30"
                  height="24"
                  viewBox="0 0 30 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={fillColor}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.8144 12.1305L13.1305 7.07617V17.1849L19.8144 12.1305Z"
                  ></path>
                  <path
                    className={fillColor}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30 19.8206H29.5315H29.0631H27.9678L27.9678 4.22509H29.5315V4.22339H30V0H9.7293e-07L8.02003e-07 4.21637H0.467784V4.22509H2.16548L2.16548 19.8206H0.467783V19.8261H1.69206e-07L0 24L30 24V19.8206ZM3.10342 19.8206L3.10342 4.22509L14.6433 4.22509L27.0303 4.22509V19.8206H14.6433L3.10342 19.8206ZM3.87076 21.0239H8.70947V23.0262H3.87076V21.0239ZM17.4192 21.0239H12.5805V23.0262H17.4192V21.0239ZM21.2903 21.0239H26.129V23.0262H21.2903V21.0239ZM8.70947 1.00098H3.87076V3.00327H8.70947V1.00098ZM12.5805 1.00098H17.4192V3.00327H12.5805V1.00098ZM26.129 1.00098H21.2903V3.00327H26.129V1.00098Z"
                  ></path>
                </svg>
                <p className={`${strokeColor} ${classes.categoryText}`}>
                  ფილმები
                </p>
              </a>
              <div className={classes.arrowDown} />
              <div className={classes.dropdownMenu}>
                <p>ქართულად გახმოვანებული</p>
                <span>|</span>
                <p>ანიმაცია</p>
                <span>|</span>
                <p>დოკუმენტური</p>
                <span>|</span>
                <p>თრეილერები</p>
                <span>|</span>
                <p>კოლექციები</p>
              </div>
            </div>
            <div className={`${classes.seriesIcon} ${classes.category}`}>
              <a href="#">
                <svg
                  className="svg-icon svg-icon--series"
                  width="30"
                  height="24"
                  viewBox="0 0 30 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.9547 12L12 6.54541V17.4545L19.9547 12Z"
                    className={fillColor}
                  ></path>
                  <rect
                    x="0.75"
                    y="0.75"
                    width="28.5"
                    height="22.5"
                    rx="3.25"
                    strokeWidth="1.5"
                    className={strokeColor}
                  ></rect>
                </svg>
                <p className={`${strokeColor} ${classes.categoryText}`}>
                  სერიალები
                </p>
              </a>
              <div className={classes.arrowDown} />
              <div className={classes.dropdownMenu}>
                <p>ქართულად გახმოვანებული</p>
                <span>|</span>
                <p>თურქული</p>
              </div>
            </div>
            <div className={`${classes.tvIcon} ${classes.category}`}>
              <a href="#">
                <svg
                  className="svg-icon svg-icon--tv"
                  width="31"
                  height="24"
                  viewBox="0 0 31 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.25 16.6137C0.25 7.5763 7.5763 0.25 16.6137 0.25C22.5694 0.25 27.7811 3.43209 30.6426 8.18524L30.9847 8.7534L22.7337 15.2184V10.7439C22.7337 10.6058 22.6218 10.4939 22.4837 10.4939H9.49452C9.35645 10.4939 9.24452 10.6058 9.24452 10.7439V22.484C9.24452 22.6221 9.35644 22.734 9.49452 22.734H22.4837C22.6218 22.734 22.7337 22.6221 22.7337 22.484V18.0098L30.9844 24.4746L30.6423 25.0428C27.7807 29.7956 22.5692 32.9775 16.6137 32.9775C7.5763 32.9775 0.25 25.6512 0.25 16.6137ZM16.6137 1.75C8.40473 1.75 1.75 8.40473 1.75 16.6137C1.75 24.8228 8.40473 31.4775 16.6137 31.4775C21.7848 31.4775 26.34 28.8372 29.0035 24.8281L24.2337 21.0908V22.484C24.2337 23.4505 23.4502 24.234 22.4837 24.234H9.49452C8.52802 24.234 7.74452 23.4505 7.74452 22.484V10.7439C7.74452 9.7774 8.52802 8.9939 9.49452 8.9939H22.4837C23.4502 8.9939 24.2337 9.7774 24.2337 10.7439V12.1375L29.0038 8.39988C26.3403 4.39047 21.7851 1.75 16.6137 1.75Z"
                    className={fillColor}
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.242 11.9932H10.7438V12.4914H11.242V11.9932ZM9.74377 10.9932V13.4914H12.242V10.9932H9.74377Z"
                    className={fillColor}
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.2384 11.9932H15.7402V12.4914H16.2384V11.9932ZM14.7402 10.9932V13.4914H17.2384V10.9932H14.7402Z"
                    className={fillColor}
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.2346 11.9932H20.7365V12.4914H21.2346V11.9932ZM19.7365 10.9932V13.4914H22.2346V10.9932H19.7365Z"
                    className={fillColor}
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.242 20.7363H10.7438V21.2345H11.242V20.7363ZM9.74377 19.7363V22.2345H12.242V19.7363H9.74377Z"
                    className={fillColor}
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.2384 20.7363H15.7402V21.2345H16.2384V20.7363ZM14.7402 19.7363V22.2345H17.2384V19.7363H14.7402Z"
                    className={fillColor}
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.2346 20.7363H20.7365V21.2345H21.2346V20.7363ZM19.7365 19.7363V22.2345H22.2346V19.7363H19.7365Z"
                    className={fillColor}
                  ></path>
                </svg>
                <p className={`${strokeColor} ${classes.categoryText}`}>
                  CINEMANIA
                </p>
              </a>
            </div>
            <div className={`${classes.kidsIcon} ${classes.category}`}>
              <a href="#">
                <svg
                  className="svg-icon svg-icon--kids"
                  width="24"
                  height="25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.907 12.493c0 2.982-1.162 5.842-3.23 7.95a10.926 10.926 0 0 1-7.8 3.294 10.926 10.926 0 0 1-7.8-3.293 11.355 11.355 0 0 1-3.074-9.82 11.276 11.276 0 0 1 3.545-6.53 10.894 10.894 0 0 1 6.778-2.817h.537a10.823 10.823 0 0 1 4.224.842 10.992 10.992 0 0 1 3.583 2.429 11.231 11.231 0 0 1 2.395 3.644c.556 1.363.842 2.825.842 4.301z"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    className={strokeColor}
                  ></path>
                  <path
                    d="M10.696 1.691v.134c-.121.612 0-.533-.175 0a10.663 10.663 0 0 1-3.577 4.882 10.895 10.895 0 0 1-5.69 2.19"
                    strokeWidth="1.56"
                    strokeMiterlimit="10"
                    className={strokeColor}
                  ></path>
                  <path
                    d="M12.955 2.413l.294.039c1.863.244 3.632.978 5.133 2.13a11.022 11.022 0 0 1 3.43 4.443c.495.958.7 2.046.59 3.124l-.358-.047c-5.451-.718-10.281-4.282-10.302-9.743"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    className={strokeColor}
                  ></path>
                  <path
                    d="M21.985 8.322l-.222-.025c-3.996-.459-8.025-2.896-9.58-6.38.105.013.977-.13 1.081-.117 1.886.217 3.683.933 5.212 2.077a11.049 11.049 0 0 1 3.509 4.445z"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    className={strokeColor}
                  ></path>
                  <path
                    d="M8.693 14.658c.789 0 1.428-.652 1.428-1.457 0-.804-.64-1.456-1.428-1.456-.789 0-1.428.652-1.428 1.457 0 .804.64 1.456 1.428 1.456zM15.06 14.658c.788 0 1.428-.652 1.428-1.457 0-.804-.64-1.456-1.428-1.456-.789 0-1.428.652-1.428 1.457 0 .804.64 1.456 1.428 1.456zM15.073 17.073a3.29 3.29 0 0 1-.936 2.304c-.6.611-1.413.955-2.26.955-.848 0-1.661-.344-2.26-.955a3.29 3.29 0 0 1-.937-2.303v-.2h6.393v.2z"
                    className={strokeColor}
                  ></path>
                </svg>
                <p className={`${strokeColor} ${classes.categoryText}`}>
                  საბავშვო
                </p>
              </a>
            </div>
          </div>

          <label
            onClick={searchBtnHandler}
            style={{ display: `${navbar ? 'flex' : 'none'}` }}
            className={classes.searchBtn}
            htmlFor="search"
          >
            <svg
              fill="none"
              viewBox="0 0 20 20"
              width="20"
              className="svg-icon svg-icon--search"
            >
              <path
                fill="#fff"
                d="M18.293 19.707l-5.387-5.387A7.92268 7.92268 0 0 1 8 16a8.00035 8.00035 0 0 1-4.44456-1.3482 8.00036 8.00036 0 0 1-2.94647-3.5903A8 8 0 0 1 11.0615.60897a8.00036 8.00036 0 0 1 3.5903 2.94647A8.00035 8.00035 0 0 1 16 8a7.92184 7.92184 0 0 1-1.68 4.906l5.387 5.386-1.414 1.414v.001zM8 2a6.00002 6.00002 0 0 0-5.88471 7.17055 5.99996 5.99996 0 0 0 1.64207 3.07205 5.99939 5.99939 0 0 0 3.0721 1.6421 6.00028 6.00028 0 0 0 3.46664-.3414 5.99968 5.99968 0 0 0 2.6927-2.2099A5.99986 5.99986 0 0 0 14 8c-.0018-1.59073-.6346-3.11577-1.7594-4.24059C11.1158 2.63459 9.59073 2.00186 8 2z"
              ></path>
            </svg>
          </label>

          <button
            className={classes.darkModeBtn}
            onClick={context.themeToggler}
          >
            <svg fill="none" viewBox="0 0 14 20" width="14">
              <path
                className={fillColor}
                d="M3.00006 16v-2.085a1.38086 1.38086 0 00-.232-.689 6.77807 6.77807 0 00-.449-.653c0-.006-.476-.619-.622-.815A7.43492 7.43492 0 01.00006 7c0-1.85652.7375-3.63699 2.05025-4.94975C3.36307.7375 5.14354 0 7.00006 0c1.85652 0 3.63704.7375 4.94974 2.05025C13.2626 3.36301 14.0001 5.14348 14.0001 7a7.5877 7.5877 0 01-1.695 4.847c-.121.164-.423.556-.6.791v.006l-.122.159c-.1736.219-.3269.4533-.458.7a.94967.94967 0 00-.118.411V16c0 1.0609-.4215 2.0783-1.17161 2.8284A3.9998 3.9998 0 017.00706 20a3.9998 3.9998 0 01-2.82843-1.1716A3.99982 3.99982 0 013.00706 16h-.007zm2 0a2.00005 2.00005 0 002 2 2.00005 2.00005 0 002-2v-.338a6.0934 6.0934 0 01-4 0V16zm2-2a3.86943 3.86943 0 002.044-.561 3.1439 3.1439 0 01.28-.82 6.30419 6.30419 0 01.653-1.019c.02304-.031.10004-.132.20004-.261.177-.231.421-.548.517-.678A5.69112 5.69112 0 0012.0001 7a4.99995 4.99995 0 00-1.4645-3.53553A5 5 0 002.00006 7a5.471 5.471 0 001.3 3.568c.086.117.315.415.466.612l.006.009.137.179c.2115.2713.40588.5555.582.851.22952.3754.38751.7901.466 1.223a3.86825 3.86825 0 002.043.558z"
              ></path>
            </svg>
          </button>

          {!context.userIsLoggedIn && (
            <div className={classes.authBtn} onClick={context.toggleAuthVis}>
              <button>Log in</button>
            </div>
          )}

          {context.userIsLoggedIn && (
            <div className={classes.userInfo}>
              <h5>{context.username}</h5>
              <p onClick={() => context.logout()}>გასვლა</p>
            </div>
          )}
        </div>
      </div>

      <div
        className={classes.mobileWrapper}
        data-theme={context.theme ? 'dark' : ''}
      >
        <MobileHeader />
      </div>

      {context.authVis && !context.userIsLoggedIn && <AuthModal />}
    </Fragment>
  );
};

export default Header;
