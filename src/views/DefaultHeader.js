import {element} from 'deku';

function render({props}) {
    return (
            <nav class="light-blue lighten-1" role="navigation">
                <div class="nav-wrapper container">
                    <a id="logo-container"
                       href="#"
                       class="brand-logo">Deku Redux Universal Hot Example</a>

                    <ul id="nav-mobile" class="side-nav"
                        style="left: -250px;">
                        <li>
                            <a href="#" data-activates="slide-out"
                               class="button-collapse show-on-large">
                                <i class="mdi-navigation-menu"></i>
                            </a>
                        </li>
                    </ul>
                    <a href="#" data-activates="slide-out"
                       class="button-collapse">
                        <i class="mdi-navigation-menu"></i>
                    </a>
                </div>
            </nav>
    );
}

export default {render};
