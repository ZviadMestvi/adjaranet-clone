import { Fragment, useState } from 'react';

import classes from './MobileHeader.module.css';
import Sidebar from '../sidebar/Sidebar';
import { Link } from 'react-router-dom';

const MobileHeader = props => {
  const [sidebarVis, setSidebarVis] = useState(false);
  const [searchBarVis, setSearchBarVis] = useState(false);

  const toggleSidebarVis = () => {
    setSidebarVis(!sidebarVis);
  };

  const toggleSearchBarVis = () => {
    setSearchBarVis(!searchBarVis);
  };

  return (
    <Fragment>
      <div
        style={{ display: `${searchBarVis ? 'flex' : 'none'}` }}
        className={classes.searchContainer}
      >
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          className={`${classes.returnArrow} fade-ready svg-icon svg-icon--back-icon`}
          onClick={toggleSearchBarVis}
        >
          <path
            d="M0.268815 6.06928L6.14216 0.265574C6.50051 -0.0885247 7.08168 -0.0885247 7.44003 0.265574C7.79845 0.619745 7.79845 1.19388 7.44003 1.54805L3.13332 5.80369H14.0823C14.5891 5.80369 15 6.20973 15 6.71052C15 7.21123 14.5891 7.61735 14.0823 7.61735H3.13332L7.43988 11.873C7.7983 12.2272 7.7983 12.8013 7.43988 13.1555C7.26075 13.3324 7.02581 13.4211 6.79095 13.4211C6.55609 13.4211 6.32123 13.3324 6.14202 13.1555L0.268815 7.35175C-0.0896063 6.99758 -0.0896063 6.42345 0.268815 6.06928Z"
            fill="#525252"
          ></path>
        </svg>
        <input
          type="text"
          id="mobileSearch"
          autoComplete="off"
          spellCheck="off"
          placeholder="ძიება..."
          className={classes.search}
          ref={element => element && element.focus()}
        />

        <div className={classes.searchShadow} onClick={toggleSearchBarVis} />
      </div>

      <div className={classes.container}>
        <div className={classes.btnContainer}>
          <button onClick={toggleSidebarVis}>
            <svg
              className="svg-icon svg-icon--sidebar"
              width="21"
              height="17"
              viewBox="0 0 21 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.2431 17.0001H1.3362C0.598172 17.0001 0 16.3993 0 15.658C0 14.9167 0.598172 14.3159 1.3362 14.3159H19.2426C19.9806 14.3159 20.5788 14.9167 20.5788 15.658C20.5788 16.3993 19.9811 17.0001 19.2431 17.0001Z"></path>
              <path d="M19.2431 9.84166H1.3362C0.598172 9.84166 0 9.24085 0 8.49957C0 7.75828 0.598172 7.15747 1.3362 7.15747H19.2426C19.9806 7.15747 20.5788 7.75828 20.5788 8.49957C20.5793 9.24085 19.9811 9.84166 19.2431 9.84166Z"></path>
              <path d="M19.2431 2.68419H1.3362C0.598172 2.68419 0 2.08338 0 1.3421C0 0.600812 0.598172 0 1.3362 0H19.2426C19.9806 0 20.5788 0.600812 20.5788 1.3421C20.5788 2.08338 19.9811 2.68419 19.2431 2.68419Z"></path>
            </svg>
          </button>
        </div>

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
                className={classes.logoPath}
                d="M11.905 29.312h-2.13v-5.76c0-.512-.098-1.003-.295-1.475a3.99 3.99 0 0 0-.808-1.219 3.778 3.778 0 0 0-1.222-.806 3.816 3.816 0 0 0-1.478-.295c-.532 0-1.025.099-1.498.295a3.91 3.91 0 0 0-1.202.806 3.766 3.766 0 0 0-.808 1.22 3.788 3.788 0 0 0-.296 1.474c0 .53.099 1.041.296 1.494.197.471.473.884.808 1.219.335.353.749.629 1.202.825a3.77 3.77 0 0 0 1.498.295c.512 0 1.005-.098 1.458-.275a3.743 3.743 0 0 0 1.203-.787v2.537a5.307 5.307 0 0 1-1.281.471 6.354 6.354 0 0 1-1.4.158 5.787 5.787 0 0 1-2.325-.472 6.056 6.056 0 0 1-1.893-1.278 6.018 6.018 0 0 1-1.28-1.907C.137 25.105 0 24.338 0 23.512c0-.825.158-1.592.453-2.32a5.934 5.934 0 0 1 1.281-1.887 6.546 6.546 0 0 1 1.893-1.278 5.786 5.786 0 0 1 2.325-.472c.789 0 1.518.138 2.208.433.69.275 1.3.668 1.833 1.16a5.969 5.969 0 0 1 1.3 1.73c.336.668.552 1.376.612 2.123v6.31zM26.805 13.27v10.282c0 .825-.158 1.592-.473 2.32a6.369 6.369 0 0 1-1.281 1.906c-.532.55-1.163.964-1.892 1.278a5.642 5.642 0 0 1-2.267.472 5.88 5.88 0 0 1-2.345-.472 6.144 6.144 0 0 1-1.912-1.278 6.019 6.019 0 0 1-1.281-1.907 5.746 5.746 0 0 1-.473-2.32c0-.825.157-1.592.473-2.32a6.27 6.27 0 0 1 1.28-1.886 6.386 6.386 0 0 1 1.913-1.278 5.882 5.882 0 0 1 2.345-.472c.473 0 .927.059 1.38.177.453.118.867.275 1.261.491v2.576a3.45 3.45 0 0 0-1.202-.826 3.623 3.623 0 0 0-1.439-.295 3.77 3.77 0 0 0-1.498.295 3.531 3.531 0 0 0-1.222.826 4.37 4.37 0 0 0-.847 1.219 3.808 3.808 0 0 0-.316 1.474c0 .53.099 1.042.316 1.494.197.472.492.865.847 1.219.355.334.769.61 1.222.826.473.196.966.314 1.498.314.513 0 1.005-.098 1.478-.314a3.644 3.644 0 0 0 1.203-.826c.335-.334.61-.747.808-1.219.197-.472.295-.963.295-1.494V13.27h2.129zM30.313 17.85h2.129V31.259c0 .668-.118 1.18-.335 1.533-.237.354-.473.61-.73.787-.315.177-.65.295-1.064.314h-3.33v-2.064h2.897c.216 0 .355-.098.414-.295a.59.59 0 0 0 .02-.314V17.85zM47.52 29.312H45.37v-5.76c0-.512-.098-1.003-.295-1.475a3.988 3.988 0 0 0-.808-1.219 3.778 3.778 0 0 0-1.222-.806 3.817 3.817 0 0 0-1.479-.295c-.532 0-1.024.099-1.498.295a3.911 3.911 0 0 0-1.202.806 3.765 3.765 0 0 0-.808 1.22 3.788 3.788 0 0 0-.295 1.474c0 .53.098 1.041.295 1.494.197.471.473.884.808 1.219.335.353.75.629 1.203.825a3.77 3.77 0 0 0 1.497.295c.513 0 1.006-.098 1.459-.275a3.743 3.743 0 0 0 1.202-.787v2.537a5.307 5.307 0 0 1-1.28.471 6.353 6.353 0 0 1-1.4.158 5.787 5.787 0 0 1-2.326-.472 6.057 6.057 0 0 1-1.892-1.278 6.016 6.016 0 0 1-1.281-1.907c-.316-.727-.453-1.494-.453-2.32 0-.825.157-1.592.453-2.32a5.932 5.932 0 0 1 1.28-1.887 6.547 6.547 0 0 1 1.893-1.278 5.786 5.786 0 0 1 2.326-.472c.788 0 1.517.138 2.207.433.69.275 1.301.668 1.833 1.16a5.966 5.966 0 0 1 1.301 1.73c.335.668.552 1.376.611 2.123v6.31h.02zM52.703 18.244c0 .059 0 .098.02.137.04.099.099.138.178.118.137-.059.275-.118.433-.177.138-.059.296-.098.453-.157a7.96 7.96 0 0 1 .868-.216c.315-.06.65-.099.965-.099v2.104c-.374.04-.71.079-1.005.118a5.757 5.757 0 0 0-.788.197 3.424 3.424 0 0 0-.71.255c-.04.02-.098.04-.157.06-.099.078-.138.196-.138.333v8.375h-2.129V17.85h2.03v.394h-.02zM69.653 29.312h-2.128v-5.76c0-.512-.099-1.003-.296-1.475a3.989 3.989 0 0 0-.808-1.219 3.778 3.778 0 0 0-1.222-.806 3.816 3.816 0 0 0-1.478-.295c-.532 0-1.025.099-1.498.295a3.911 3.911 0 0 0-1.202.806 3.765 3.765 0 0 0-.808 1.22 3.788 3.788 0 0 0-.296 1.474c0 .53.099 1.041.296 1.494.197.471.473.884.808 1.219.335.353.749.629 1.202.825a3.77 3.77 0 0 0 1.498.295c.512 0 1.005-.098 1.458-.275a3.744 3.744 0 0 0 1.203-.787v2.537a5.307 5.307 0 0 1-1.281.471 6.354 6.354 0 0 1-1.4.158 5.787 5.787 0 0 1-2.325-.472 6.056 6.056 0 0 1-1.893-1.278 6.02 6.02 0 0 1-1.28-1.907c-.316-.727-.454-1.494-.454-2.32 0-.825.158-1.592.453-2.32a5.935 5.935 0 0 1 1.281-1.887 6.546 6.546 0 0 1 1.893-1.278 5.785 5.785 0 0 1 2.325-.472c.789 0 1.518.138 2.208.433.69.275 1.3.668 1.833 1.16a5.968 5.968 0 0 1 1.3 1.73c.335.668.552 1.376.611 2.123v6.31z"
              ></path>
              <path
                fill="white"
                d="M79.45 17.85h2.128v11.462h-2.129V17.85zm9.341 5.682c0-1.16-.295-2.084-.886-2.772-.592-.688-1.459-1.022-2.602-1.022-.591 0-1.084.098-1.498.295a3.866 3.866 0 0 0-1.084.766v-2.457c.158-.157.335-.275.572-.374.216-.098.453-.157.67-.216.236-.059.453-.098.65-.118.197-.02.375-.04.513-.04.906 0 1.714.139 2.444.414.729.275 1.32.668 1.833 1.18.492.51.867 1.14 1.143 1.867a7.39 7.39 0 0 1 .394 2.457h-.02v5.78h-2.109v-5.76h-.02zM99.868 17.615c.828 0 1.597.157 2.326.471a5.964 5.964 0 0 1 3.134 3.166c.315.727.453 1.494.453 2.32 0 .176 0 .334-.02.432a5.61 5.61 0 0 0-.059.413h-9.638c.178.963.592 1.75 1.242 2.339.65.59 1.518.885 2.582.885.769 0 1.399-.158 1.912-.452a4.397 4.397 0 0 0 1.281-1.121h2.207c-.492 1.022-1.222 1.848-2.168 2.497-.965.648-2.03.963-3.232.963a5.785 5.785 0 0 1-2.326-.472 6.289 6.289 0 0 1-1.892-1.278 5.963 5.963 0 0 1-1.261-1.907c-.316-.727-.454-1.494-.454-2.32 0-.825.158-1.592.454-2.32a5.984 5.984 0 0 1 1.261-1.886 6.055 6.055 0 0 1 1.892-1.278 5.953 5.953 0 0 1 2.306-.452zm3.863 4.934a3.121 3.121 0 0 0-.453-1.14 3.298 3.298 0 0 0-.847-.963 4.511 4.511 0 0 0-1.163-.669 3.72 3.72 0 0 0-1.42-.256c-.512 0-1.005.08-1.418.236a3.834 3.834 0 0 0-1.144.65c-.335.274-.61.589-.808.962a3.65 3.65 0 0 0-.453 1.16h7.706v.02zM114.67 27.208v2.104h-3.41a1.928 1.928 0 0 1-1.025-.335c-.256-.176-.492-.432-.709-.786-.217-.354-.315-.884-.315-1.573V13.27h2.069v4.58h2.641v2.104h-2.641v6.625c-.02.098 0 .216.039.315.04.078.079.137.158.196.059.06.178.099.316.099h2.877v.02z"
              ></path>
              <path
                className={classes.logoPath}
                d="M125.313 29.312h-2.188v-2.183h2.188v2.183zM131.916 27.503a3.93 3.93 0 0 0 1.872-.452 4.165 4.165 0 0 0 1.4-1.219h2.306a6.8 6.8 0 0 1-.887 1.514 5.548 5.548 0 0 1-1.281 1.16 6.446 6.446 0 0 1-1.577.747 6.135 6.135 0 0 1-1.813.275 6.126 6.126 0 0 1-2.326-.452c-.729-.315-1.36-.728-1.892-1.278a6.152 6.152 0 0 1-1.281-1.887c-.316-.728-.454-1.494-.454-2.32 0-.845.158-1.632.454-2.36.315-.727.729-1.356 1.281-1.886a6.543 6.543 0 0 1 1.892-1.278 5.787 5.787 0 0 1 2.326-.472c.63 0 1.222.098 1.813.275a5.584 5.584 0 0 1 1.577.767c.473.334.906.727 1.281 1.18.374.451.67.963.887 1.513h-2.306a3.99 3.99 0 0 0-1.38-1.238c-.571-.315-1.202-.452-1.892-.452-.552 0-1.064.098-1.537.314a3.869 3.869 0 0 0-1.242.845 4.045 4.045 0 0 0-.848 1.259 4.049 4.049 0 0 0-.315 1.553c0 .55.099 1.061.315 1.533.198.472.493.885.848 1.239.355.353.769.629 1.242.825.473.197.985.295 1.537.295zM145.831 17.615c.828 0 1.616.157 2.345.471.73.315 1.38.747 1.912 1.278s.966 1.16 1.281 1.887c.316.728.473 1.514.473 2.36 0 .825-.157 1.592-.473 2.32a6.035 6.035 0 0 1-1.281 1.887c-.532.55-1.163.963-1.912 1.277-.729.315-1.517.453-2.345.453a6.128 6.128 0 0 1-2.326-.452c-.729-.315-1.36-.728-1.892-1.278a6.15 6.15 0 0 1-1.281-1.888c-.315-.727-.453-1.494-.453-2.32 0-.845.157-1.631.453-2.358.315-.728.729-1.357 1.281-1.888a6.555 6.555 0 0 1 1.892-1.278 5.785 5.785 0 0 1 2.326-.471zm0 9.888c.552 0 1.064-.098 1.557-.295a3.885 3.885 0 0 0 1.261-.825c.355-.354.631-.767.848-1.239a3.95 3.95 0 0 0 .315-1.533c0-.55-.098-1.062-.315-1.553a3.934 3.934 0 0 0-2.109-2.104 4.075 4.075 0 0 0-1.557-.315c-.552 0-1.064.099-1.537.315a3.869 3.869 0 0 0-1.242.845 4.045 4.045 0 0 0-.848 1.259 4.049 4.049 0 0 0-.315 1.553c0 .55.099 1.061.315 1.533.197.472.493.885.848 1.239.355.353.769.629 1.242.825.473.197.985.295 1.537.295zM154.878 17.85h2.128v11.462h-2.128V17.85zm6.918 4.581c0-.295-.02-.59-.04-.904a2.45 2.45 0 0 0-.256-.865 1.715 1.715 0 0 0-.65-.649c-.296-.177-.69-.256-1.222-.256-.04 0-.198 0-.533.02-.315.02-.611.079-.867.177v-1.946c.355-.157.71-.256 1.045-.295.355-.04.611-.06.768-.06.651 0 1.222.139 1.676.394.453.275.847.63 1.182 1.081.355-.53.868-.924 1.538-1.14a6.022 6.022 0 0 1 2.03-.334c.591 0 1.163.079 1.715.236a3.256 3.256 0 0 1 1.438.845c.414.393.749.924 1.005 1.573.257.649.375 1.474.375 2.457v6.507h-2.129v-6.88c0-.295-.039-.59-.098-.905a2.613 2.613 0 0 0-.375-.865c-.177-.255-.433-.471-.768-.648-.335-.177-.749-.256-1.281-.256-.513 0-.907.079-1.222.256-.316.177-.572.373-.749.629-.178.255-.316.53-.375.865-.059.314-.098.629-.098.924v6.88h-2.109v-6.841z"
              ></path>
            </svg>
          </Link>
        </div>

        <div onClick={toggleSearchBarVis}>
          <svg
            fill="none"
            viewBox="0 0 20 20"
            width="20"
            className="svg-icon svg-icon--search"
          >
            <path
              className={classes.searchLogoPath}
              d="M18.293 19.707l-5.387-5.387A7.92268 7.92268 0 0 1 8 16a8.00035 8.00035 0 0 1-4.44456-1.3482 8.00036 8.00036 0 0 1-2.94647-3.5903A8 8 0 0 1 11.0615.60897a8.00036 8.00036 0 0 1 3.5903 2.94647A8.00035 8.00035 0 0 1 16 8a7.92184 7.92184 0 0 1-1.68 4.906l5.387 5.386-1.414 1.414v.001zM8 2a6.00002 6.00002 0 0 0-5.88471 7.17055 5.99996 5.99996 0 0 0 1.64207 3.07205 5.99939 5.99939 0 0 0 3.0721 1.6421 6.00028 6.00028 0 0 0 3.46664-.3414 5.99968 5.99968 0 0 0 2.6927-2.2099A5.99986 5.99986 0 0 0 14 8c-.0018-1.59073-.6346-3.11577-1.7594-4.24059C11.1158 2.63459 9.59073 2.00186 8 2z"
            ></path>
          </svg>
        </div>
      </div>

      <Sidebar visHandler={toggleSidebarVis} sidebarVis={sidebarVis} />
    </Fragment>
  );
};

export default MobileHeader;