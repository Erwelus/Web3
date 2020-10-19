package Ervelus.dao;

import Ervelus.jsf.EntryBean;
import Ervelus.model.Entry;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;

@ManagedBean
@ApplicationScoped
public class EntryDao {
    private DataSource ds  = null;
    private Connection con = null;

    public EntryDao(){
        connect();
    }

    private void connect() {
        try {
            InitialContext ctx = new InitialContext();
            ds = (DataSource) ctx.lookup("java:jboss/datasources/weblab3");
            if (ds != null) {
                con = ds.getConnection();
                con.createStatement().execute("CREATE TABLE IF NOT EXISTS results (" +
                        "x float ," +
                        "y float," +
                        "r integer," +
                        "res boolean," +
                        "session_id text)");
            }
            //System.out.println("-------------------------Successfully connected!---------------------");
        }catch (SQLException | NamingException ex){ ex.printStackTrace();}
    }

    public ArrayList<Entry> getEntries(String session_id) throws SQLException{
        if(con==null) connect();
        PreparedStatement st = con.prepareStatement("SELECT * FROM results WHERE session_id =?");
        st.setString(1, session_id);
        ResultSet resultSet = st.executeQuery();
        ArrayList<Entry> entries = new ArrayList<>();
        while (resultSet.next()){
            Entry currentEntry = new Entry();
            currentEntry.setX(resultSet.getDouble("x"));
            currentEntry.setY(resultSet.getDouble("y"));
            currentEntry.setR(resultSet.getDouble("r"));
            currentEntry.setRes(resultSet.getBoolean("res"));
            entries.add(currentEntry);
        }
        return entries;
    }

    public void addEntry(Entry entry) throws SQLException {
        if(con==null) connect();
        PreparedStatement st = con.prepareStatement("INSERT INTO results (x, y, r, res, session_id) VALUES (?,?,?,?,?)");
        st.setDouble(1, entry.getX());
        st.setDouble(2, entry.getY());
        st.setDouble(3, entry.getR());
        st.setBoolean(4, entry.isRes());
        st.setString(5, entry.getSession_id());
        st.executeUpdate();
    }

    public void deleteEntries(String session_id) throws SQLException {
        if(con==null) connect();
        PreparedStatement st = con.prepareStatement("DELETE FROM results WHERE session_id =?");
        st.setString(1, session_id);
        st.executeUpdate();
    }


}
