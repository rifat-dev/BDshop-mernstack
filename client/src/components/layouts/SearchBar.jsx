import { Fragment } from 'react';

const SearchBar = () => {
    return (
        <Fragment>
            <form class=" ">
                <div class=" row no-gutters align-items-center">
                    <div class="col-auto">
                        <i class="fas fa-search h4 text-body"></i>
                    </div>
                    <div class="col">
                        <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search topics or keywords" />
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-lg btn-success" type="submit">Search</button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
}

export default SearchBar;
