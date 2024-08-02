import { Route, Routes } from 'react-router-dom';
import Home from './components/studentList/student-list.component';
import View from './components/view/view.component';
import Lookup from './components/lookup/lookup.component';

import NotFound from './components/notFound/not-found.component';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/lookup" element={<Lookup />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
